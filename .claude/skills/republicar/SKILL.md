---
name: republicar
description: Rotina semanal completa - atualiza o catálogo do site, escolhe o lote da semana e publica/renova os anúncios no Facebook Marketplace com supervisão do usuário. É o comando que o atalho da área de trabalho dispara.
---

# Republicar anúncios no Marketplace

Siga as fases na ordem, sem pular. As "Regras de ouro" do CLAUDE.md valem sempre e prevalecem sobre esta skill.

**Não faça contas nem edite arquivos de estado de cabeça.** Os scripts abaixo existem para isso; use-os sempre:

| Para | Comando |
| --- | --- |
| Atualizar o catálogo do site | `node scripts/coleta.mjs` |
| Montar o lote da semana (máx. 10, já ordenado e filtrado) | `node scripts/lote.mjs` |
| Ficha de um anúncio pronta para o formulário | `node scripts/lote.mjs ficha <id>` |
| Baixar as fotos de um anúncio | `node scripts/coleta.mjs --fotos <id>` |
| Ver quais ativos ainda não têm link | `node scripts/lote.mjs links` |
| Gravar o estado após cada item | `node scripts/estado.mjs <publicado|renovado|link|removido|erro> <id> ...` |

Fale com o usuário em português simples, uma pergunta por vez.

## Fase 0 — Verificações

1. Rode `curl -s --max-time 3 http://127.0.0.1:12306/ping`. Deve responder `{"status":"ok"}`. Se falhar: peça ao usuário para abrir o Google Chrome, clicar no ícone da extensão e em "Conectar"; tente de novo até 3 vezes; se continuar falhando, encerre explicando em uma frase.
2. Abra `https://www.facebook.com/marketplace/you/selling` com `chrome_navigate` (`newWindow: true`; guarde o `tabId` e passe-o em TODAS as chamadas seguintes). Use `chrome_read_page` para conferir se há uma sessão logada. Se aparecer tela de login, peça para o usuário entrar na conta e diga que você espera; confira de novo depois do "pronto".
3. Cumprimente o usuário em uma frase e diga que vai conferir o site primeiro.

## Fase 1 — Catálogo

1. Rode `node scripts/coleta.mjs`.
2. Resuma em linguagem simples o que o script imprimiu: total no site, novos, removidos, preços alterados, sem foto.
3. Para cada anúncio listado como **removido do site** que exista no estado com status `ativo`: rode `node scripts/estado.mjs removido-site <id>`.
4. Se o script falhar (site fora do ar, sem internet): explique em uma frase, sugira tentar mais tarde e encerre a rodada.

## Fase 2 — Montar o lote

1. Rode `node scripts/lote.mjs`. Ele imprime a lista numerada do lote (remoções, depois renovações, depois novos; máximo 10) e o que ficou de fora com o motivo. Não recalcule nada; não inclua itens que ele deixou de fora.
2. Mostre ao usuário a lista numerada exatamente como o script deu (ação, título, preço) e pergunte: "Posso seguir com essa lista? (sim / não / tirar algum)".
3. Só continue com o "sim". Se ele pedir para tirar itens, tire e mostre a lista final antes de começar.
4. Se o lote estiver vazio, vá direto para a Fase 4.

## Fase 3 — Executar item a item

### 3.0 Antes do primeiro item: capturar links pendentes

Se o `lote.mjs` avisou "Ativos ainda sem link do Marketplace":

1. Rode `node scripts/lote.mjs links` para ver título exato e preço de cada um.
2. Com a aba em `https://www.facebook.com/marketplace/you/selling`, rode com `chrome_javascript`:
   ```js
   return [...document.querySelectorAll('a[href*="/marketplace/item/"]')]
     .map(a => ({ caminho: new URL(a.href).pathname, texto: a.innerText.replace(/\s+/g, ' ').slice(0, 120) }))
     .slice(0, 60);
   ```
3. Para cada pendente cujo `texto` contenha o `tituloPublicado` exato E o preço, rode `node scripts/estado.mjs link <id> https://www.facebook.com<caminho>`.
4. Se não encontrar (ainda "em análise"), siga em frente sem gravar nada.

### 3.1 Entre um item e outro

Rode `sleep 60` no Bash antes de começar cada item a partir do segundo. Nunca encurte.

### 3.2 Renovação

1. Abra o `linkMarketplace` gravado no estado (está na saída do `lote.mjs`). **Nunca** localize só pelo título: há muitos títulos repetidos.
2. Procure o botão "Renovar" / "Renovar anúncio" com `chrome_click_element` e XPath, por exemplo `//*[@role="button"][contains(., "Renovar")]`. Se não estiver na página do item, volte a `/marketplace/you/selling` e procure o botão dentro do card cujo link contém o mesmo número do item.
3. Se em 3 tentativas não encontrar, use `chrome_request_element_selection` e peça: "clique no botão Renovar deste anúncio, por favor" (expira em ~120 s).
4. Se o Facebook não oferecer renovação, não recrie: rode `node scripts/estado.mjs erro <id> --motivo "sem opção de renovar"` e avise no resumo.
5. Confirme com `chrome_screenshot` (`storeBase64: true`) e salve o PNG em `estado/logs/AAAA-MM-DD/<id>-renovado.png`.
6. Rode `node scripts/estado.mjs renovado <id>`.

### 3.3 Criação (anúncio novo)

Regra geral desta etapa: **preencha um campo, confira, só então vá ao próximo.** Nunca avance com um campo errado achando que corrige depois. Para conferir, use sempre este trecho com `chrome_javascript` (chame-o de "conferência"):

```js
const campos = {};
for (const l of document.querySelectorAll('label')) {
  const inp = l.querySelector('input, textarea');
  if (inp) campos[l.innerText.replace(/\s+/g, ' ').trim().slice(0, 40)] = inp.value;
}
const combos = [...document.querySelectorAll('[role="combobox"]')].map(c => c.innerText.replace(/\s+/g, ' ').trim().slice(0, 60));
const fotos = document.querySelectorAll('img[src^="blob:"]').length;
return { combos, campos, fotos };
```

1. Rode `node scripts/coleta.mjs --fotos <id>` e depois `node scripts/lote.mjs ficha <id>`. A ficha traz todos os valores do formulário já mapeados e os caminhos absolutos das fotos em ordem. Se algum campo da ficha disser "NÃO PUBLICAR", pule o item, rode `node scripts/estado.mjs erro <id> --motivo "<o que a ficha disse>"` e siga. Se a ficha trouxer `avisoTipo`, siga-o: o tipo do formulário é o que a ficha manda, mesmo que o título do site diga lote, terra ou galpão, e a descrição já vem com o título real no início.
2. Abra `https://www.facebook.com/marketplace/create/rental`.
3. **Venda ou aluguel (primeiro de tudo).** Clique na combobox "Imóvel residencial para venda ou locação" e depois na opção da ficha: `//*[@role="option"][contains(., "À venda")]` (ou "Aluguel"). Rode a conferência: em `combos` deve aparecer "À venda". Se não aparecer, repita até 3 vezes; se continuar, peça ao usuário: "clique em 'À venda' na primeira caixa, por favor". **Não preencha mais nada enquanto isso não estiver certo**: o padrão do Facebook é aluguel e o preço sairia como "R$ .../mês".
4. **Tipo de imóvel.** Mesmo procedimento com a combobox "Tipo de imóvel" e o valor da ficha. Confira em `combos`.
5. **Quartos e banheiros.** Preencha com `chrome_fill_or_select` os inputs dentro dos rótulos "Número de quartos" e "Número de banheiros" (só o número). Rode a conferência: `campos` deve mostrar os dois valores. Sem eles o Facebook gera o título só como "Casa"/"Apartamento" e o anúncio fica incompleto. Se a ficha diz "deixe em branco" e o formulário exigir, coloque 0.
6. **Preço.** Preencha só os dígitos da ficha. Confira em `campos`.
7. **Descrição.** Preencha a textarea "Descrição do imóvel" com o texto da ficha. Confira que `campos` mostra o início do texto. Metros quadrados só se a ficha tiver valor.
8. **Fotos, em UMA única chamada.** Rode a conferência e anote `fotos` (deve ser 0). Faça **uma só** chamada de `chrome_upload_file` no seletor `input[type="file"][accept*="image"]` com `multiple: true` e TODOS os caminhos de `caminhosAbsolutosEmOrdem`. Espere (`sleep 10`) e rode a conferência: `fotos` deve ser igual ao total da ficha. Se for **menor**, envie só as que faltam (compare pelos nomes) em uma nova chamada. Se for **maior** (duplicou), não envie mais nada: clique no "x" das repetidas até o número bater; se não conseguir, feche a aba sem salvar, registre no caderno de aprendizados e recomece este item do passo 2. **Nunca** chame o upload de novo "para garantir".
9. **Localização.** Preencha o campo com a cidade da ficha e diga ao usuário: "Apareceu uma lista de cidades. Clique na primeira opção, por favor, e me diga 'pronto'." Espere. Depois confira se o botão "Avançar" ficou habilitado; se não, peça o clique de novo.
10. **Checklist do preview (obrigatório antes de Avançar).** Tire `chrome_screenshot` (`storeBase64: true`) e confira no painel "Prévia": o título tem o formato "N quartos M banheiros Tipo"; o preço NÃO termina em "/mês" quando é venda; a quantidade de fotos na faixa inferior bate com a ficha; a cidade está certa. Qualquer item errado: volte ao passo correspondente e corrija. Só clique em "Avançar" com tudo certo.
11. Página de audiência: leia a lista de grupos exibida e siga o passo 8 de "Montando o anúncio" do CLAUDE.md (sincronizar `estado/grupos.json`; na primeira vez, perguntar ao usuário quais usar; marcar os que têm `usar: true`). Nunca marque grupos fora da escolha.
12. Clique em "Publicar". No modal "Turbine seu classificado", clique em "Fechar". **Nunca** clique em "Turbinar".
13. Leia o título que o Facebook gerou (ex.: "2 quartos 1 banheiro Apartamento") com `chrome_read_page` ou screenshot. Salve o PNG em `estado/logs/AAAA-MM-DD/<id>-publicado.png`.
14. Rode `node scripts/estado.mjs publicado <id> --titulo "<título exato gerado>" --grupos "<nomes dos grupos marcados, separados por ;>"`. O link fica nulo de propósito: o anúncio nasce "em análise" e o link é capturado na próxima rodada (3.0).

**Screenshots:** para VER a tela use sempre `chrome_screenshot` com `storeBase64: true`. Não use a ferramenta Read em arquivos da pasta Downloads nem de fora do projeto. Para guardar a confirmação em `estado/logs/`, mova com `mv` no Bash o arquivo que o navegador salvou.

### 3.4 Remoção

1. Pergunte ao usuário, para ESTE item: "Posso excluir do Marketplace o anúncio '<título>' de R$ <preço>? (sim / não)". Sem "sim", pule.
2. Abra o `linkMarketplace` do estado. Sem link válido, não exclua: rode `node scripts/estado.mjs erro <id> --motivo "sem link para localizar com segurança"` e avise.
3. Confira título exato E preço na página antes de excluir. Exclua pelo menu do anúncio (`chrome_click_element` por XPath; se não achar em 3 tentativas, `chrome_request_element_selection`).
4. Screenshot em `estado/logs/AAAA-MM-DD/<id>-removido.png` e rode `node scripts/estado.mjs removido <id>`.

### 3.5 Falhas e avisos

- **Caderno de aprendizados** (seção "Aprendizado contínuo" do CLAUDE.md): antes de contornar qualquer falha, veja se o caderno já tem a solução e aplique-a. Sempre que uma segunda tentativa ou um caminho alternativo funcionar, registre na hora com `node scripts/aprendizado.mjs registrar --etapa ... --problema ... --solucao ...`. Se desistir de um item, registre com `--pendente`.
- Se um item falhar duas vezes: `node scripts/estado.mjs erro <id> --motivo "<motivo curto>"`, avise em uma frase e **siga para o próximo**. Não trave a rodada.
- Se o Facebook mostrar aviso, verificação, bloqueio ou captcha: tire screenshot, salve em `estado/logs/`, avise o usuário para resolver manualmente e **encerre a rodada** (Fase 4). Nunca tente contornar.

## Fase 4 — Resumo final

Informe em poucas linhas: quantos publicados (e em quais grupos), renovados, removidos, com erro; quantos ficaram para a próxima rodada (o `lote.mjs` já disse); quantos foram publicados com tipo adaptado (o `lote.mjs` marca com *) e os que ficaram fora do formulário, se houver; grupos novos detectados no Facebook (lembre que dá para ligá-los com "configurar grupos"); quantos aprendizados novos foram registrados no caderno; e qualquer pendência que dependa do usuário. Termine desejando uma boa semana.
