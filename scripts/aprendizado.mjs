#!/usr/bin/env node
// Caderno de aprendizados: registra tropeços e o que funcionou, para o assistente
// não repetir o mesmo erro nas próximas rodadas. Fica em estado/aprendizados.json.
//
// Uso:
//   node scripts/aprendizado.mjs listar
//       Imprime o caderno (é o que a inicialização da sessão injeta no contexto).
//   node scripts/aprendizado.mjs registrar --etapa "<onde>" --problema "<o que deu errado>" --solucao "<o que funcionou>" [--pendente]
//       Etapas sugeridas: conexao, login, catalogo, lote, formulario, fotos, localizacao, grupos, publicar, renovar, remover, link, facebook-aviso, outro
//       Sem --pendente, a entrada nasce como "resolvido". Use --pendente quando ainda não achou saída.
//   node scripts/aprendizado.mjs resolver <n> --solucao "<o que funcionou>"
//       Marca a entrada nº n como resolvida.
//   node scripts/aprendizado.mjs confirmar <n>
//       Registra que a solução da entrada nº n funcionou de novo (conta acertos).
//   node scripts/aprendizado.mjs remover <n>
//       Apaga uma entrada errada ou obsoleta.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ARQ = path.join(RAIZ, 'estado', 'aprendizados.json');
const MAX_MOSTRAR = 40;

function agoraLocal() {
  const d = new Date();
  const off = -d.getTimezoneOffset();
  const p = (n) => String(Math.abs(n)).padStart(2, '0');
  return new Date(d.getTime() + off * 60000).toISOString().slice(0, 16) + (off >= 0 ? '+' : '-') + p(Math.trunc(off / 60)) + ':' + p(off % 60);
}

function opcao(args, nome) {
  const i = args.indexOf(nome);
  return i >= 0 ? args[i + 1] : undefined;
}

async function ler() {
  if (!existsSync(ARQ)) return { proximoId: 1, entradas: [] };
  return JSON.parse(await readFile(ARQ, 'utf8'));
}

async function gravar(c) {
  await mkdir(path.dirname(ARQ), { recursive: true });
  await writeFile(ARQ, JSON.stringify(c, null, 2) + '\n');
}

function imprimir(c) {
  const pend = c.entradas.filter((e) => e.status === 'pendente');
  const res = c.entradas.filter((e) => e.status === 'resolvido');
  if (!c.entradas.length) {
    console.log('CADERNO DE APRENDIZADOS: vazio. Registre com: node scripts/aprendizado.mjs registrar --etapa ... --problema ... --solucao ...');
    return;
  }
  console.log(`CADERNO DE APRENDIZADOS (${res.length} resolvidos, ${pend.length} pendentes). Leia antes de agir; registre o que aprender nesta rodada.`);
  if (pend.length) {
    console.log('\nPENDENTES (ainda sem solução — se resolver hoje, rode "resolver <n> --solucao ..."):');
    for (const e of pend) console.log(`  [${e.id}] ${e.etapa} — ${e.problema} (${e.em})`);
  }
  if (res.length) {
    console.log('\nO QUE JÁ FUNCIONOU (aplique direto; se funcionar de novo, rode "confirmar <n>"):');
    const ordenados = [...res].sort((a, b) => (b.confirmacoes || 0) - (a.confirmacoes || 0)).slice(0, MAX_MOSTRAR);
    for (const e of ordenados) {
      const conf = e.confirmacoes ? ` ✓×${e.confirmacoes}` : '';
      console.log(`  [${e.id}] ${e.etapa}${conf}\n      problema: ${e.problema}\n      solução:  ${e.solucao}`);
    }
    if (res.length > MAX_MOSTRAR) console.log(`  (+${res.length - MAX_MOSTRAR} antigos não mostrados)`);
  }
}

const [cmd, ...resto] = process.argv.slice(2);
const c = await ler();

switch (cmd) {
  case undefined:
  case 'listar':
    imprimir(c);
    break;
  case 'registrar': {
    const etapa = opcao(resto, '--etapa');
    const problema = opcao(resto, '--problema');
    const solucao = opcao(resto, '--solucao');
    const pendente = resto.includes('--pendente');
    if (!etapa || !problema || (!solucao && !pendente)) {
      console.error('Uso: registrar --etapa "<onde>" --problema "<o que deu errado>" --solucao "<o que funcionou>"   (ou --pendente no lugar de --solucao)');
      process.exit(1);
    }
    const repetida = c.entradas.find((e) => e.etapa === etapa && e.problema.trim().toLowerCase() === problema.trim().toLowerCase());
    if (repetida) {
      if (solucao) { repetida.solucao = solucao; repetida.status = 'resolvido'; repetida.atualizadoEm = agoraLocal(); }
      console.log(`Já existia a entrada [${repetida.id}] com esse problema; atualizei em vez de duplicar.`);
      await gravar(c);
      break;
    }
    const e = { id: c.proximoId++, em: agoraLocal(), etapa, problema, solucao: solucao ?? null, status: pendente ? 'pendente' : 'resolvido', confirmacoes: 0 };
    c.entradas.push(e);
    await gravar(c);
    console.log(`Registrado [${e.id}] ${e.etapa} (${e.status}).`);
    break;
  }
  case 'resolver': {
    const id = Number(resto[0]);
    const solucao = opcao(resto, '--solucao');
    const e = c.entradas.find((x) => x.id === id);
    if (!e || !solucao) { console.error('Uso: resolver <n> --solucao "<o que funcionou>"'); process.exit(1); }
    e.solucao = solucao; e.status = 'resolvido'; e.atualizadoEm = agoraLocal();
    await gravar(c);
    console.log(`[${id}] marcado como resolvido.`);
    break;
  }
  case 'confirmar': {
    const id = Number(resto[0]);
    const e = c.entradas.find((x) => x.id === id);
    if (!e) { console.error(`Entrada ${resto[0]} não existe.`); process.exit(1); }
    e.confirmacoes = (e.confirmacoes || 0) + 1; e.atualizadoEm = agoraLocal();
    await gravar(c);
    console.log(`[${id}] confirmado (${e.confirmacoes}x).`);
    break;
  }
  case 'remover': {
    const id = Number(resto[0]);
    const antes = c.entradas.length;
    c.entradas = c.entradas.filter((x) => x.id !== id);
    if (c.entradas.length === antes) { console.error(`Entrada ${resto[0]} não existe.`); process.exit(1); }
    await gravar(c);
    console.log(`[${id}] removido.`);
    break;
  }
  default:
    console.error('Comandos: listar | registrar | resolver | confirmar | remover (veja o cabeçalho do arquivo)');
    process.exit(1);
}
