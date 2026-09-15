#!/usr/bin/env node
// Grava o estado dos anúncios no Marketplace (estado/publicados.json) sem edição manual.
// Sempre use este script; nunca edite o arquivo à mão.
//
// Uso:
//   node scripts/estado.mjs publicado <id> --titulo "2 quartos 1 banheiro Apartamento" [--grupos "Grupo A; Grupo B"]
//   node scripts/estado.mjs renovado <id>
//   node scripts/estado.mjs link <id> <https://www.facebook.com/marketplace/item/...>
//   node scripts/estado.mjs removido-site <id>          (saiu do site; remover na próxima rodada, com confirmação)
//   node scripts/estado.mjs removido <id>               (já excluído do Marketplace)
//   node scripts/estado.mjs erro <id> --motivo "..."
//   node scripts/estado.mjs mostrar [<id>]

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ARQ_ESTADO = path.join(RAIZ, 'estado', 'publicados.json');
const ARQ_ANUNCIOS = path.join(RAIZ, 'catalogo', 'anuncios.json');

function agoraLocal() {
  const d = new Date();
  const off = -d.getTimezoneOffset();
  const sinal = off >= 0 ? '+' : '-';
  const p = (n) => String(Math.abs(n)).padStart(2, '0');
  const local = new Date(d.getTime() + off * 60000).toISOString().slice(0, 19);
  return `${local}${sinal}${p(Math.trunc(off / 60))}:${p(off % 60)}`;
}

function opcao(args, nome) {
  const i = args.indexOf(nome);
  return i >= 0 ? args[i + 1] : undefined;
}

async function ler() {
  if (!existsSync(ARQ_ESTADO)) return { anuncios: {} };
  const e = JSON.parse(await readFile(ARQ_ESTADO, 'utf8'));
  e.anuncios ||= {};
  return e;
}

async function gravar(estado) {
  await mkdir(path.dirname(ARQ_ESTADO), { recursive: true });
  await writeFile(ARQ_ESTADO, JSON.stringify(estado, null, 2) + '\n');
}

async function dadosDoSite(id) {
  if (!existsSync(ARQ_ANUNCIOS)) return null;
  const c = JSON.parse(await readFile(ARQ_ANUNCIOS, 'utf8'));
  const a = c.anuncios.find((x) => String(x.id) === String(id));
  return a ? { titulo: a.titulo, preco: a.preco } : null;
}

const [cmd, id, ...resto] = process.argv.slice(2);
const estado = await ler();
const em = agoraLocal();

function exigirRegistro() {
  const r = estado.anuncios[id];
  if (!r) { console.error(`#${id} não está no estado. Use "publicado" primeiro.`); process.exit(1); }
  return r;
}

switch (cmd) {
  case 'publicado': {
    const titulo = opcao(resto, '--titulo');
    if (!id || !titulo) { console.error('Uso: publicado <id> --titulo "<título gerado pelo Facebook>" [--grupos "A; B"]'); process.exit(1); }
    const site = await dadosDoSite(id);
    const grupos = opcao(resto, '--grupos');
    const anterior = estado.anuncios[id];
    estado.anuncios[id] = {
      titulo: site?.titulo ?? anterior?.titulo ?? null,
      preco: site?.preco ?? anterior?.preco ?? null,
      tituloPublicado: titulo,
      linkMarketplace: null,
      publicadoEm: em,
      renovadoEm: null,
      status: 'ativo',
      historico: [...(anterior?.historico ?? []), { acao: 'publicado', em, ...(grupos ? { grupos } : {}) }],
    };
    break;
  }
  case 'renovado': {
    const r = exigirRegistro();
    r.renovadoEm = em;
    r.status = 'ativo';
    r.historico.push({ acao: 'renovado', em });
    break;
  }
  case 'link': {
    const r = exigirRegistro();
    const url = resto[0];
    if (!url || !/facebook\.com\/marketplace\/item\/\d+/.test(url)) { console.error('Informe o link completo: https://www.facebook.com/marketplace/item/<número>'); process.exit(1); }
    r.linkMarketplace = url.split('?')[0];
    r.historico.push({ acao: 'link-capturado', em });
    break;
  }
  case 'removido-site': {
    const r = exigirRegistro();
    r.status = 'removido-site';
    r.historico.push({ acao: 'saiu-do-site', em });
    break;
  }
  case 'removido': {
    const r = exigirRegistro();
    r.status = 'removido';
    r.historico.push({ acao: 'removido', em });
    break;
  }
  case 'erro': {
    const motivo = opcao(resto, '--motivo') ?? 'sem detalhe';
    const site = await dadosDoSite(id);
    const r = estado.anuncios[id] ?? { titulo: site?.titulo ?? null, preco: site?.preco ?? null, tituloPublicado: null, linkMarketplace: null, publicadoEm: null, renovadoEm: null, historico: [] };
    r.status = 'erro';
    r.historico.push({ acao: 'erro', em, motivo });
    estado.anuncios[id] = r;
    break;
  }
  case 'mostrar': {
    const dados = id ? { [id]: estado.anuncios[id] ?? 'não existe no estado' } : estado.anuncios;
    console.log(JSON.stringify(dados, null, 2));
    process.exit(0);
  }
  default:
    console.error('Comandos: publicado | renovado | link | removido-site | removido | erro | mostrar  (veja o cabeçalho do arquivo)');
    process.exit(1);
}

await gravar(estado);
console.log(`OK: #${id} -> ${cmd} em ${em}`);
console.log(JSON.stringify(estado.anuncios[id], null, 2));
