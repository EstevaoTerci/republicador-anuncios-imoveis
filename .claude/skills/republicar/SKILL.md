---
name: republicar
description: Rotina semanal completa - atualiza o catálogo do site, escolhe o lote da semana e publica/renova os anúncios no Facebook Marketplace com supervisão do usuário. É o comando que o atalho da área de trabalho dispara.
---

# Republicar anúncios no Marketplace

Siga as fases na ordem. As "Regras de ouro" do CLAUDE.md valem sempre e prevalecem sobre esta skill.

## Fase 0 — Verificações (rápidas e silenciosas)

1. `curl -s --max-time 3 http://127.0.0.1:12306/ping` deve responder `{"status":"ok"}`. Se falhar: peça ao usuário para abrir o Google Chrome, clicar no ícone da extensão e em "Conectar"; tente de novo; se continuar falhando, encerre explicando.
2. Abra `https://www.facebook.com/marketplace/you/selling` com `chrome_navigate` e confira com `chrome_read_page` se há uma sessão logada do Facebook (se aparecer tela de login, peça para o usuário entrar na conta e diga que você espera).
3. Cumprimente o usuário em uma frase e diga que vai conferir o site primeiro.

## Fase 1 — Catálogo

Execute a skill `atualizar-catalogo` (rode o script e resuma as mudanças).

## Fase 2 — Montar o lote da semana

Cruzando `catalogo/anuncios.json` com `estado/publicados.json`, monte o lote com prioridade:

1. **Remoções** — anúncios `removido-site` ainda ativos no Marketplace (só executa com confirmação individual).
2. **Renovações** — publicados há 7 dias ou mais (`publicadoEm`/`renovadoEm` mais antigo primeiro).
3. **Novos** — anúncios do site que nunca foram publicados (mais recentes primeiro; pule os sem foto, avisando).

Corte em **10 itens** no total. Apresente a lista numerada (ação + título + preço) e pergunte: "Posso seguir com essa lista? (sim / não / tirar algum)". Só continue com o "sim".

## Fase 3 — Executar item a item

Antes do primeiro item: para cada anúncio `ativo` no estado com `linkMarketplace: null`, abra o card dele em "Seus classificados" e tente capturar o link do item (`/marketplace/item/<id>`), salvando no estado (se ainda estiver "em análise", siga em frente).

Para cada item, nesta ordem, com pausa de 45–90s entre itens (`sleep 60`):

**Renovação:** abra direto o `linkMarketplace` salvo no estado (nunca procure só pelo título — há muitos repetidos) e use a opção "Renovar anúncio" (prefira `chrome_computer`). Se o link estiver quebrado, localize em "Seus anúncios" pelo `tituloPublicado` exato E confira o preço antes de agir. Screenshot de confirmação em `estado/logs/AAAA-MM-DD/<id>-renovado.png`; atualize `renovadoEm` e o `historico` no estado.

**Criação** (siga passo a passo o fluxo validado em "Montando o anúncio" do CLAUDE.md):
1. Baixe as fotos: `node scripts/coleta.mjs --fotos <id>`.
2. Abra `facebook.com/marketplace/create/rental`, selecione "À venda"/"Aluguel" e o tipo; se o `tipo` do catálogo não for residencial (lote, terra, galpão, comercial), pule e anote para o resumo.
3. Preencha os campos e suba as fotos com `chrome_upload_file` (caminhos absolutos de `catalogo/fotos/<id>/`, uma chamada por foto).
4. Localização: preencha a cidade e **peça ao usuário para clicar na primeira sugestão** ("clique na primeira opção da lista, por favor") — é o único clique humano do fluxo; aguarde e confira se o "Avançar" habilitou.
5. Confira o preview com screenshot; "Avançar" → página de audiência: aplique os grupos conforme `estado/grupos.json` (na primeira publicação, apresente a lista e pergunte a escolha — ver passo 8 de "Montando o anúncio" no CLAUDE.md) → "Publicar" → feche o modal "Turbinar".
6. Screenshot em `estado/logs/AAAA-MM-DD/<id>-publicado.png`; registre no estado (`publicadoEm`, `tituloPublicado` gerado pelo Facebook, histórico). O link do item ainda não existe ("em análise") — deixe `linkMarketplace: null` e capture na próxima rodada.

**Remoção (confirmada):** abra o `linkMarketplace` do estado (mesma regra da renovação: nunca só pelo título; confira título exato E preço antes de excluir — exclusão é irreversível), exclua, screenshot, marque `status: "removido"` no estado.

Se um item falhar duas vezes, marque `status: "erro"` com o motivo no histórico, avise em uma frase e **siga para o próximo** — não trave a rodada. Atualize o estado após CADA item.

## Fase 4 — Resumo final

Informe em poucas linhas: quantos publicados (e em quais grupos), renovados, removidos, com erro; quantos ficaram para a próxima rodada; grupos novos detectados no Facebook (se houver, lembre que dá para ligá-los com "configurar grupos"); e qualquer pendência que dependa do usuário. Termine desejando uma boa semana.
