#!/usr/bin/env node
// Coleta os anúncios do site marcosperesimoveis.com.br via WP REST API (sem browser).
//
// Uso:
//   node scripts/coleta.mjs                    Atualiza catalogo/anuncios.json e mostra o resumo de mudanças
//   node scripts/coleta.mjs --fotos 9258,9100  Baixa as fotos desses anúncios para catalogo/fotos/<id>/
//   node scripts/coleta.mjs --fotos todos      Baixa fotos de todos os anúncios do catálogo
//
// O catálogo é a fonte de verdade local; a publicação no Marketplace lê daqui.

import { mkdir, readFile, writeFile, readdir, unlink } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = 'https://marcosperesimoveis.com.br';
const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIR_CATALOGO = path.join(RAIZ, 'catalogo');
const DIR_FOTOS = path.join(DIR_CATALOGO, 'fotos');
const ARQ_ANUNCIOS = path.join(DIR_CATALOGO, 'anuncios.json');
const ARQ_MUDANCAS = path.join(DIR_CATALOGO, 'mudancas-ultima-coleta.json');

const pausa = (ms) => new Promise((r) => setTimeout(r, ms));

async function requisitar(url, { tentativas = 3, comoTexto = false } = {}) {
  let ultimoErro;
  for (let i = 1; i <= tentativas; i++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'coleta-anuncios/1.0 (uso interno do corretor)' } });
      if (!res.ok) throw new Error(`HTTP ${res.status} em ${url}`);
      if (comoTexto) return { texto: await res.text(), headers: res.headers };
      return res;
    } catch (e) {
      ultimoErro = e;
      if (i < tentativas) await pausa(1500 * i);
    }
  }
  throw ultimoErro;
}

async function requisitarJson(url, opts) {
  const { texto, headers } = await requisitar(url, { ...opts, comoTexto: true });
  return { corpo: JSON.parse(texto), texto, headers };
}

async function tamanhoRemoto(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    if (!res.ok) return null;
    const len = Number(res.headers.get('content-length'));
    return Number.isFinite(len) && len > 0 ? len : null;
  } catch {
    return null;
  }
}

const ENTIDADES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '–', mdash: '—', hellip: '…', laquo: '«', raquo: '»', ldquo: '“', rdquo: '”', lsquo: '‘', rsquo: '’' };

const codePointSeguro = (n, original) => (Number.isInteger(n) && n >= 0 && n <= 0x10ffff ? String.fromCodePoint(n) : original);

function decodificarEntidades(texto) {
  return texto
    .replace(/&#x([0-9a-f]+);/gi, (m, h) => codePointSeguro(parseInt(h, 16), m))
    .replace(/&#(\d+);/g, (m, d) => codePointSeguro(Number(d), m))
    .replace(/&([a-z]+);/gi, (m, nome) => ENTIDADES[nome.toLowerCase()] ?? m);
}

function textoLimpo(html) {
  return decodificarEntidades(
    html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(p|div|li|h[1-6])>/gi, '\n')
      .replace(/<[^>]+>/g, '')
  )
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .join('\n');
}

const numeroOuNull = (v) => {
  const n = Number(String(v ?? '').replace(',', '.'));
  return v !== '' && v != null && Number.isFinite(n) && n > 0 ? n : null;
};

async function buscarTermos(taxonomia) {
  try {
    const { corpo } = await requisitarJson(`${BASE}/wp-json/wp/v2/${taxonomia}?per_page=100`);
    return new Map(corpo.map((t) => [t.id, decodificarEntidades(t.name)]));
  } catch (e) {
    console.warn(`Aviso: não consegui resolver a taxonomia ${taxonomia} (${e.message}); sigo com IDs.`);
    return new Map();
  }
}

// JSON.parse reordena chaves inteiras (a galeria {"8434":...,"8423":...} vira 8423,8434),
// então a ordem REAL das fotos — a que o corretor arrumou no site — só existe no texto cru.
// Cada property começa com `"id":N,"date":` (padrão exclusivo dos posts nesta resposta);
// atribuímos cada property_gallery ao property iniciado mais recentemente antes dela.
function extrairOrdemGalerias(texto, ordem = new Map()) {
  const inicios = [...texto.matchAll(/"id":(\d+),"date":/g)].map((m) => ({ id: Number(m[1]), pos: m.index }));
  for (const g of texto.matchAll(/"property_gallery":\{(.*?)\}/g)) {
    let dono = null;
    for (const p of inicios) {
      if (p.pos < g.index) dono = p;
      else break;
    }
    if (dono) ordem.set(dono.id, [...g[1].matchAll(/"(\d+)":/g)].map((m) => Number(m[1])));
  }
  return ordem;
}

async function buscarTodosImoveis() {
  const itens = [];
  const ordemGalerias = new Map();
  let pagina = 1;
  let totalPaginas = 1;
  do {
    const { corpo, texto, headers } = await requisitarJson(`${BASE}/wp-json/wp/v2/property?per_page=100&page=${pagina}`);
    totalPaginas = Number(headers.get('x-wp-totalpages') || '1');
    itens.push(...corpo);
    extrairOrdemGalerias(texto, ordemGalerias);
    pagina++;
    if (pagina <= totalPaginas) await pausa(500);
  } while (pagina <= totalPaginas);
  return { itens, ordemGalerias };
}

function normalizar(bruto, tipos, locais, ordemGalerias) {
  const cmb = bruto.cmb2 ?? {};
  const geral = cmb.property_general ?? {};
  const precos = cmb.property_pricing ?? {};
  const attrs = cmb.property_attributes ?? {};
  const flags = cmb.property_flags ?? {};

  const galeria = geral.property_gallery && typeof geral.property_gallery === 'object' ? geral.property_gallery : {};
  const idsGaleria = Object.keys(galeria).map(Number);
  const ordemSite = ordemGalerias.get(bruto.id) ?? [];
  // Ordem do site primeiro; qualquer id que escape da extração entra no fim, ascendente.
  const idsOrdenados = [...ordemSite.filter((k) => k in galeria), ...idsGaleria.filter((k) => !ordemSite.includes(k)).sort((a, b) => a - b)];
  const fotos = idsOrdenados.map((k) => ({ midiaId: k, url: galeria[k] }));
  // A foto de capa do site (featured_media) vai primeiro: vira a capa no Marketplace.
  const idxCapa = fotos.findIndex((f) => f.midiaId === bruto.featured_media);
  if (idxCapa > 0) fotos.unshift(...fotos.splice(idxCapa, 1));

  return {
    id: bruto.id,
    slug: bruto.slug,
    link: bruto.link,
    titulo: decodificarEntidades(bruto.title?.rendered ?? '').trim(),
    descricao: textoLimpo(bruto.content?.rendered ?? ''),
    preco: numeroOuNull(precos.property_price),
    precoTexto: precos.property_price_custom || null,
    negocio: geral.property_contract === 'RENT' ? 'Aluguel' : 'Venda',
    tipo: (bruto.property_types ?? []).map((id) => tipos.get(id) ?? `tipo#${id}`).join(', ') || null,
    cidade: (bruto.locations ?? []).map((id) => locais.get(id) ?? `local#${id}`).join(', ') || null,
    endereco: geral.property_address || null,
    quartos: numeroOuNull(attrs.property_beds),
    banheiros: numeroOuNull(attrs.property_baths),
    vagas: numeroOuNull(attrs.property_garages),
    areaConstruida: numeroOuNull(attrs.property_home_area),
    areaTerreno: numeroOuNull(attrs.property_lot_area),
    destaque: flags.property_featured === 'on',
    fotos,
    capaMidiaId: bruto.featured_media || null,
    modificadoEm: bruto.modified_gmt ? `${bruto.modified_gmt}Z` : null,
  };
}

// Se a galeria veio vazia mas existe featured_media, busca a URL dessa mídia.
async function completarCapasFaltantes(anuncios) {
  for (const a of anuncios) {
    if (a.fotos.length > 0 || !a.capaMidiaId) continue;
    try {
      const { corpo } = await requisitarJson(`${BASE}/wp-json/wp/v2/media/${a.capaMidiaId}`);
      if (corpo.source_url) a.fotos.push({ midiaId: a.capaMidiaId, url: corpo.source_url });
      await pausa(300);
    } catch {
      /* segue sem foto; a skill avisa o usuário */
    }
  }
}

function calcularMudancas(anteriores, atuais) {
  const mapaAntes = new Map(anteriores.map((a) => [a.id, a]));
  const mapaAgora = new Map(atuais.map((a) => [a.id, a]));
  const novos = atuais.filter((a) => !mapaAntes.has(a.id));
  const removidos = anteriores.filter((a) => !mapaAgora.has(a.id));
  const precoAlterado = atuais
    .filter((a) => mapaAntes.has(a.id) && mapaAntes.get(a.id).preco !== a.preco)
    .map((a) => ({ id: a.id, titulo: a.titulo, precoAntes: mapaAntes.get(a.id).preco, precoAgora: a.preco }));
  return { novos, removidos, precoAlterado };
}

const resumoAnuncio = (a) => `#${a.id} ${a.titulo}${a.preco ? ` — R$ ${a.preco.toLocaleString('pt-BR')}` : ''}${a.cidade ? ` (${a.cidade})` : ''}`;

async function lerCatalogo() {
  if (!existsSync(ARQ_ANUNCIOS)) return null;
  try {
    const dados = JSON.parse(await readFile(ARQ_ANUNCIOS, 'utf8'));
    return Array.isArray(dados.anuncios) ? dados.anuncios : null;
  } catch {
    return null;
  }
}

async function coletar() {
  console.log('Coletando anúncios do site...');
  const [{ itens, ordemGalerias }, tipos, locais] = await Promise.all([
    buscarTodosImoveis(),
    buscarTermos('property_types'),
    buscarTermos('locations'),
  ]);
  const anuncios = itens.filter((b) => b.status === 'publish').map((b) => normalizar(b, tipos, locais, ordemGalerias));
  await completarCapasFaltantes(anuncios);

  const anteriores = (await lerCatalogo()) ?? [];
  if (anteriores.length === 0 && existsSync(ARQ_ANUNCIOS)) {
    console.warn('Aviso: catálogo anterior ilegível ou vazio; tratando como primeira coleta.');
  }
  const mudancas = calcularMudancas(anteriores, anuncios);
  const semFoto = anuncios.filter((a) => a.fotos.length === 0);

  await mkdir(DIR_CATALOGO, { recursive: true });
  await writeFile(ARQ_ANUNCIOS, JSON.stringify({ coletadoEm: new Date().toISOString(), total: anuncios.length, anuncios }, null, 2));
  await writeFile(
    ARQ_MUDANCAS,
    JSON.stringify(
      {
        em: new Date().toISOString(),
        totalAtivos: anuncios.length,
        primeiraColeta: anteriores.length === 0,
        novos: mudancas.novos.map((a) => ({ id: a.id, titulo: a.titulo, preco: a.preco })),
        removidos: mudancas.removidos.map((a) => ({ id: a.id, titulo: a.titulo })),
        precoAlterado: mudancas.precoAlterado,
        semFoto: semFoto.map((a) => a.id),
      },
      null,
      2
    )
  );

  console.log(`\nCatálogo atualizado: ${anuncios.length} anúncios ativos no site.`);
  if (anteriores.length === 0) {
    console.log('Primeira coleta — todos os anúncios são novos para o catálogo.');
  } else {
    console.log(`Novos: ${mudancas.novos.length}${mudancas.novos.length ? '\n  ' + mudancas.novos.map(resumoAnuncio).join('\n  ') : ''}`);
    console.log(`Removidos do site: ${mudancas.removidos.length}${mudancas.removidos.length ? '\n  ' + mudancas.removidos.map(resumoAnuncio).join('\n  ') : ''}`);
    console.log(`Preço alterado: ${mudancas.precoAlterado.length}${mudancas.precoAlterado.length ? '\n  ' + mudancas.precoAlterado.map((m) => `#${m.id} ${m.titulo}: R$ ${m.precoAntes ?? '?'} → R$ ${m.precoAgora ?? '?'}`).join('\n  ') : ''}`);
  }
  if (semFoto.length) console.log(`Atenção — sem nenhuma foto: ${semFoto.map((a) => `#${a.id}`).join(', ')}`);
}

// Preferimos o arquivo original do WP (sem o sufixo -LARGxALT de thumbnail), mas só
// quando ele existir E não for menor que a versão da galeria — um original com nome
// coincidente de OUTRA foto seria menor/diferente, e a URL da galeria é sempre segura.
function urlSemSufixoTamanho(url) {
  const m = url.match(/^(.*)-\d+x\d+(\.[a-z0-9]+)$/i);
  return m ? `${m[1]}${m[2]}` : null;
}

async function escolherUrlFoto(url) {
  const candidata = urlSemSufixoTamanho(url);
  if (!candidata) return url;
  const [tamCandidata, tamOriginal] = await Promise.all([tamanhoRemoto(candidata), tamanhoRemoto(url)]);
  return tamCandidata && tamOriginal && tamCandidata >= tamOriginal ? candidata : url;
}

async function baixarFotosDe(anuncio) {
  const dir = path.join(DIR_FOTOS, String(anuncio.id));
  await mkdir(dir, { recursive: true });
  const manifesto = [];
  let baixadas = 0;
  for (let i = 0; i < anuncio.fotos.length; i++) {
    const { url, midiaId } = anuncio.fotos[i];
    const ext = (url.match(/\.([a-z0-9]+)(?:\?.*)?$/i)?.[1] ?? 'jpg').toLowerCase();
    // O midiaId no nome garante que arquivo existente = conteúdo certo, mesmo se a galeria mudar.
    const nome = `${String(i + 1).padStart(2, '0')}-${midiaId}.${ext}`;
    const destino = path.join(dir, nome);
    if (existsSync(destino)) {
      manifesto.push({ arquivo: nome, origem: url });
      continue;
    }

    const melhorUrl = await escolherUrlFoto(url);
    const res = await requisitar(melhorUrl, { tentativas: 3 }).catch(() => null);
    if (!res) {
      console.warn(`  Falhou (fica fora do fotos.json): ${url}`);
      continue;
    }
    await writeFile(destino, Buffer.from(await res.arrayBuffer()));
    manifesto.push({ arquivo: nome, origem: url });
    baixadas++;
    await pausa(250);
  }
  await writeFile(path.join(dir, 'fotos.json'), JSON.stringify({ anuncio: anuncio.id, titulo: anuncio.titulo, fotos: manifesto }, null, 2));

  // Remove sobras de galerias antigas (arquivo fora do manifesto atual).
  const validos = new Set([...manifesto.map((f) => f.arquivo), 'fotos.json']);
  for (const arq of await readdir(dir)) {
    if (!validos.has(arq)) await unlink(path.join(dir, arq)).catch(() => {});
  }
  console.log(`#${anuncio.id} ${anuncio.titulo}: ${manifesto.length}/${anuncio.fotos.length} fotos no disco (${baixadas} baixadas agora) em ${dir}`);
}

async function baixarFotos(selecao) {
  const anuncios = await lerCatalogo();
  if (!anuncios) {
    console.error('Catálogo inexistente ou ilegível. Rode antes: node scripts/coleta.mjs');
    process.exit(1);
  }
  let alvos;
  if (selecao === 'todos') {
    alvos = anuncios;
  } else {
    const pedidos = selecao.split(',').map((s) => Number(s.trim()));
    alvos = anuncios.filter((a) => pedidos.includes(a.id));
    const naoEncontrados = pedidos.filter((id) => !anuncios.some((a) => a.id === id));
    if (naoEncontrados.length) {
      console.error(`ERRO: estes ids não existem no catálogo: ${naoEncontrados.join(', ')}. Confira e rode de novo.`);
      process.exit(1);
    }
  }
  if (!alvos.length) {
    console.error(`Nenhum anúncio do catálogo casa com "${selecao}".`);
    process.exit(1);
  }
  for (const a of alvos) await baixarFotosDe(a);
}

const args = process.argv.slice(2);
const idxFotos = args.indexOf('--fotos');
if (idxFotos !== -1) {
  const selecao = args[idxFotos + 1];
  if (!selecao) {
    console.error('Uso: node scripts/coleta.mjs --fotos <id1,id2|todos>');
    process.exit(1);
  }
  await baixarFotos(selecao);
} else {
  await coletar();
}
