#!/usr/bin/env node
// Monta o lote da semana e a ficha de cada anúncio para o formulário do Marketplace.
// Faz as contas que o assistente NÃO deve fazer de cabeça (cruzar catálogo x estado,
// prazo de 7 dias, tipos aceitos, fotos, limite de 10).
//
// Uso:
//   node scripts/lote.mjs                Lista numerada do lote (máx. 10) + o que ficou de fora. Grava estado/lote-atual.json
//   node scripts/lote.mjs ficha <id>     Dados prontos para preencher o formulário (tipo mapeado, preço só dígitos, fotos em ordem)
//   node scripts/lote.mjs links          Anúncios ativos ainda sem linkMarketplace (para capturar em "Seus classificados")

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ARQ_ANUNCIOS = path.join(RAIZ, 'catalogo', 'anuncios.json');
const ARQ_ESTADO = path.join(RAIZ, 'estado', 'publicados.json');
const ARQ_LOTE = path.join(RAIZ, 'estado', 'lote-atual.json');
const DIR_FOTOS = path.join(RAIZ, 'catalogo', 'fotos');
const ARQ_CONFIG = path.join(RAIZ, 'estado', 'config.json');

const LIMITE_LOTE = 10;
const DIAS_RENOVACAO = 7;
const LIMITE_FOTOS = 50;

// Só estes tipos existem no formulário do Facebook. Qualquer outro fica de fora.
const RESIDENCIAL = {
  apartamento: 'Apartamento',
  kitnet: 'Apartamento',
  casa: 'Casa',
  duplex: 'Casa',
  sobrado: 'Sobrado geminado',
};

async function lerJson(arq, padrao) {
  if (!existsSync(arq)) return padrao;
  return JSON.parse(await readFile(arq, 'utf8'));
}

function moeda(v) {
  if (v == null) return null;
  return 'R$ ' + Number(v).toLocaleString('pt-BR');
}

// Classifica o tipo do catálogo: { formulario: 'Casa' } | { formulario, forcado: true } | { motivo: '...' }
// Com estado/config.json { publicarNaoResidencialComo: 'Apartamento' }, tipos fora do formulário
// (e tipos mistos) entram como esse tipo, marcados como "forcado" para aparecer no lote e na descrição.
function classificarTipo(tipo, cfg) {
  const forcarComo = cfg?.publicarNaoResidencialComo || null;
  const partes = String(tipo || '').split(',').map((p) => p.trim().toLowerCase()).filter(Boolean);
  const residenciais = partes.map((p) => RESIDENCIAL[p]).filter(Boolean);
  const outros = partes.filter((p) => !RESIDENCIAL[p]);
  if (!residenciais.length) {
    if (forcarComo) return { formulario: forcarComo, forcado: true, tipoReal: tipo || 'sem tipo' };
    return { motivo: tipo ? `tipo "${tipo}" não existe no formulário do Facebook` : 'sem tipo no site' };
  }
  if (outros.length) {
    if (forcarComo) return { formulario: residenciais[0], forcado: true, tipoReal: tipo };
    return { misto: true, motivo: `tipo misto "${tipo}" — decidir com o Estêvão se cabe como ${residenciais[0]}` };
  }
  return { formulario: residenciais[0] };
}

function diasDesde(iso) {
  if (!iso) return null;
  return (Date.now() - new Date(iso).getTime()) / 86400000;
}

function linha(acao, a, extra = '') {
  const preco = moeda(a.preco) ?? a.precoTexto ?? 'sem preço';
  return `${acao.padEnd(9)} #${a.id}  ${a.titulo}  —  ${preco}${extra ? '  (' + extra + ')' : ''}`;
}

async function montarLote() {
  const catalogo = await lerJson(ARQ_ANUNCIOS, null);
  if (!catalogo) {
    console.error('Catálogo não encontrado. Rode antes: node scripts/coleta.mjs');
    process.exit(1);
  }
  const anuncios = catalogo.anuncios;
  const estado = await lerJson(ARQ_ESTADO, { anuncios: {} });
  const cfg = await lerJson(ARQ_CONFIG, {});
  const pub = estado.anuncios || {};
  const noSite = new Map(anuncios.map((a) => [String(a.id), a]));

  const remocoes = [];
  const renovacoes = [];
  const novos = [];
  const fora = { naoResidencial: [], tipoMisto: [], semFoto: [], semPreco: [], erroAnterior: [] };

  // 1) Remoções: saiu do site (ou está marcado removido-site) e ainda está no Marketplace
  for (const [id, e] of Object.entries(pub)) {
    if (e.status === 'removido-site' || (e.status === 'ativo' && !noSite.has(id))) {
      remocoes.push({ id: Number(id), titulo: e.tituloPublicado || e.titulo, preco: e.preco ?? null, acao: 'remover', link: e.linkMarketplace, tituloPublicado: e.tituloPublicado });
    }
  }

  // 2) Renovações: ativos há 7+ dias desde a última ação (mais antigo primeiro)
  for (const [id, e] of Object.entries(pub)) {
    if (e.status !== 'ativo' || !noSite.has(id)) continue;
    const ultima = e.renovadoEm || e.publicadoEm;
    const dias = diasDesde(ultima);
    if (dias != null && dias >= DIAS_RENOVACAO) {
      const a = noSite.get(id);
      renovacoes.push({ id: a.id, titulo: a.titulo, preco: a.preco, acao: 'renovar', dias: Math.floor(dias), link: e.linkMarketplace, tituloPublicado: e.tituloPublicado, ultima });
    }
  }
  renovacoes.sort((x, y) => new Date(x.ultima) - new Date(y.ultima));

  // 3) Novos: nunca publicados (mais recentes primeiro)
  const candidatos = anuncios
    .filter((a) => !pub[String(a.id)] || pub[String(a.id)].status === 'erro')
    .sort((x, y) => new Date(y.modificadoEm || 0) - new Date(x.modificadoEm || 0));
  for (const a of candidatos) {
    const e = pub[String(a.id)];
    if (e && e.status === 'erro') { fora.erroAnterior.push(a); continue; }
    const t = classificarTipo(a.tipo, cfg);
    if (!t.formulario) { (t.misto ? fora.tipoMisto : fora.naoResidencial).push({ ...a, motivo: t.motivo }); continue; }
    if (!a.fotos || !a.fotos.length) { fora.semFoto.push(a); continue; }
    if (a.preco == null) { fora.semPreco.push(a); continue; }
    novos.push({ id: a.id, titulo: a.titulo, preco: a.preco, acao: 'publicar', tipoFormulario: t.formulario, forcado: !!t.forcado, tipoReal: t.tipoReal ?? a.tipo });
  }

  const tudo = [...remocoes, ...renovacoes, ...novos];
  const lote = tudo.slice(0, LIMITE_LOTE);
  const sobraram = tudo.length - lote.length;
  const semLink = Object.entries(pub).filter(([, e]) => e.status === 'ativo' && !e.linkMarketplace).map(([id]) => '#' + id);

  console.log(`LOTE DA SEMANA (${lote.length} de no máximo ${LIMITE_LOTE})`);
  if (!lote.length) console.log('  Nada a fazer nesta rodada.');
  lote.forEach((item, i) => {
    const extra = item.acao === 'renovar' ? `${item.dias} dias` : item.acao === 'publicar' ? (item.forcado ? `${item.tipoFormulario}* — tipo real: ${item.tipoReal}` : item.tipoFormulario) : '';
    console.log(`  ${String(i + 1).padStart(2)}. ${linha(item.acao.toUpperCase(), item, extra)}`);
  });
  if (lote.some((i) => i.forcado)) console.log(`  * publicado como "${cfg.publicarNaoResidencialComo}" por configuração (estado/config.json); a descrição começa pelo título real do site.`);
  console.log('');
  console.log(`Ficam para a próxima rodada: ${sobraram}`);
  if (semLink.length) console.log(`Ativos ainda sem link do Marketplace (capturar antes do 1º item): ${semLink.join(', ')}`);
  console.log('');
  console.log('FORA DO LOTE (não entram no Marketplace — listar no resumo final)');
  console.log(`  Tipo não aceito pelo formulário (lote, terra, galpão, prédio, comercial...): ${fora.naoResidencial.length}`);
  fora.naoResidencial.forEach((a) => console.log(`     #${a.id} ${a.titulo} — ${a.tipo}`));
  console.log(`  Tipo misto (o Estêvão decide): ${fora.tipoMisto.length}`);
  fora.tipoMisto.forEach((a) => console.log(`     #${a.id} ${a.titulo} — ${a.tipo}`));
  console.log(`  Sem foto: ${fora.semFoto.length}${fora.semFoto.length ? '  ' + fora.semFoto.map((a) => '#' + a.id).join(', ') : ''}`);
  console.log(`  Sem preço ("consulte"): ${fora.semPreco.length}${fora.semPreco.length ? '  ' + fora.semPreco.map((a) => '#' + a.id).join(', ') : ''}`);
  console.log(`  Com erro na rodada anterior (não reprocessar sozinho): ${fora.erroAnterior.length}${fora.erroAnterior.length ? '  ' + fora.erroAnterior.map((a) => '#' + a.id).join(', ') : ''}`);

  await mkdir(path.dirname(ARQ_LOTE), { recursive: true });
  const foraResumo = Object.fromEntries(Object.entries(fora).map(([k, v]) => [k, v.map((a) => ({ id: a.id, titulo: a.titulo, tipo: a.tipo, motivo: a.motivo }))]));
  await writeFile(ARQ_LOTE, JSON.stringify({ geradoEm: new Date().toISOString(), lote, sobraram, semLink, fora: foraResumo }, null, 2));
}

function formatarDescricao(texto) {
  if (!texto) return '';
  return String(texto)
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .join('\n\n');
}

async function ficha(id) {
  const catalogo = await lerJson(ARQ_ANUNCIOS, null);
  const a = catalogo?.anuncios.find((x) => String(x.id) === String(id));
  if (!a) { console.error(`Anúncio #${id} não está no catálogo.`); process.exit(1); }
  const cfg = await lerJson(ARQ_CONFIG, {});
  const t = classificarTipo(a.tipo, cfg);
  const dirFotos = path.join(DIR_FOTOS, String(a.id));
  const manifesto = await lerJson(path.join(dirFotos, 'fotos.json'), null);
  const fotos = manifesto ? manifesto.fotos.slice(0, LIMITE_FOTOS).map((f) => path.join(dirFotos, f.arquivo)) : [];

  const saida = {
    id: a.id,
    tituloSite: a.titulo,
    formulario: {
      'Imóvel residencial para venda ou locação': a.negocio === 'Venda' ? 'À venda' : 'Aluguel',
      'Tipo de imóvel': t.formulario ?? `NÃO PUBLICAR — ${t.motivo}`,
      'Número de quartos': a.quartos ?? '(não informado no site — deixe em branco)',
      'Número de banheiros': a.banheiros ?? '(não informado no site — deixe em branco)',
      'Preço (só dígitos)': a.preco != null ? String(a.preco) : `NÃO PUBLICAR — sem preço (${a.precoTexto ?? 'consulte'})`,
      'Metros quadrados': a.areaConstruida ?? a.areaTerreno ?? '(não informado — deixe em branco)',
      'Localização (cidade a digitar)': a.cidade,
      'Descrição do imóvel': (t.forcado ? `${a.titulo}

` : '') + formatarDescricao(a.descricao),
    },
    avisoTipo: t.forcado ? `Tipo real no site: "${t.tipoReal}". Vai como "${t.formulario}" por configuração. Quartos/banheiros sem valor: deixe em branco; se o formulário exigir, coloque 0.` : null,
    fotos: {
      total: fotos.length,
      aviso: fotos.length ? null : `Fotos ainda não baixadas. Rode: node scripts/coleta.mjs --fotos ${a.id}`,
      caminhosAbsolutosEmOrdem: fotos,
    },
    linkSite: a.link,
  };
  console.log(JSON.stringify(saida, null, 2));
}

async function links() {
  const estado = await lerJson(ARQ_ESTADO, { anuncios: {} });
  const pend = Object.entries(estado.anuncios || {}).filter(([, e]) => e.status === 'ativo' && !e.linkMarketplace);
  if (!pend.length) { console.log('Todos os anúncios ativos já têm link.'); return; }
  console.log('Ativos sem link (procurar em https://www.facebook.com/marketplace/you/selling pelo título EXATO e preço):');
  for (const [id, e] of pend) console.log(`  #${id}  título no Marketplace: "${e.tituloPublicado}"  preço: ${moeda(e.preco) ?? '?'}  publicado em ${e.publicadoEm}`);
}

const [cmd, arg] = process.argv.slice(2);
if (!cmd) await montarLote();
else if (cmd === 'ficha' && arg) await ficha(arg);
else if (cmd === 'links') await links();
else { console.error('Uso: node scripts/lote.mjs | node scripts/lote.mjs ficha <id> | node scripts/lote.mjs links'); process.exit(1); }
