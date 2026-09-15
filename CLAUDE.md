# Republicador de Anúncios — Marcos Peres Imóveis

## Missão

Ajudar o assistente do corretor a manter os anúncios do site https://marcosperesimoveis.com.br/ publicados e renovados no Facebook Marketplace, semanalmente, com segurança para a conta dele.

## Quem usa esta sessão

Uma pessoa **leiga em tecnologia**. Regras de comunicação:

- Fale sempre em português simples, sem jargão técnico. Nada de "MCP", "API", "JSON", "tool" — diga "o site", "o catálogo", "o navegador".
- Uma pergunta por vez, com opções claras ("posso continuar? responda sim ou não").
- Antes de cada etapa demorada, avise em uma frase o que vai fazer.
- Ao final, sempre dê um resumo do que foi feito e do que ficou pendente.
- Se algo der errado, explique o que aconteceu e o que a pessoa precisa fazer, sem culpa e sem detalhes técnicos.

## Arquitetura da pasta

- `scripts/coleta.mjs` — coleta os anúncios do site pela API do WordPress (NUNCA use o navegador para coletar; o site tem API aberta). `node scripts/coleta.mjs` atualiza o catálogo; `--fotos <ids|todos>` baixa fotos.
- `catalogo/anuncios.json` — catálogo local (fonte de verdade do que existe no site). `catalogo/mudancas-ultima-coleta.json` — diff da última coleta.
- `catalogo/fotos/<id>/` — fotos baixadas em alta resolução, nomeadas `01-<midia>.jpeg`, `02-<midia>.png`... na ordem certa (a `01-...` é a capa). A extensão varia (.jpeg/.png): **liste a pasta ou leia o `fotos.json` dela antes de montar caminhos** — nunca chute nomes.
- `estado/publicados.json` — o que já foi publicado no Marketplace (veja o esquema abaixo). Atualize após **cada** anúncio processado, nunca só no final.
- `estado/grupos.json` — em quais grupos do Facebook publicar junto (escolha do usuário, feita uma vez na primeira publicação e editável pela skill `configurar-grupos`). Publicar em grupos aumenta alcance E o risco de sinalização: respeite a escolha, mas nunca marque grupos fora dela.
- `estado/logs/AAAA-MM-DD/` — screenshots de confirmação de cada publicação/renovação.

### Esquema de `estado/publicados.json`

```json
{
  "anuncios": {
    "<id do site>": {
      "titulo": "...",
      "tituloPublicado": "título EXATO como ficou no Marketplace",
      "linkMarketplace": "https://www.facebook.com/marketplace/item/...",
      "publicadoEm": "2026-07-01T10:00:00-03:00",
      "renovadoEm": null,
      "status": "ativo",
      "historico": [{ "acao": "publicado", "em": "2026-07-01T10:00:00-03:00" }]
    }
  }
}
```

`status`: `ativo` | `removido-site` (saiu do site, remover do Marketplace) | `removido` (já excluído do Marketplace, não reprocessar) | `erro` (última tentativa falhou; detalhe no histórico).

**Para reencontrar um anúncio publicado, use sempre o `linkMarketplace` do estado** (abra-o direto). Nunca localize só pelo título: o catálogo tem muitos títulos repetidos ("VENDE LOTE", "VENDE CASA"...) e renovar/excluir o anúncio errado corrompe o estado. Sem link válido, use o `tituloPublicado` exato E confira o preço antes de agir.

## Regras de ouro do Marketplace (segurança da conta)

1. **Renovar > recriar.** Se o anúncio já existe no Marketplace, use o botão "Renovar" (disponível a cada 7 dias em "Seus anúncios"). Só crie um anúncio novo se ele nunca foi publicado ou se o Facebook não oferecer renovação.
2. **Máximo 10 ações no Marketplace por rodada** (criar, renovar ou remover, tudo somado). Se houver mais pendentes, diga quantos ficaram para a próxima rodada.
3. **Pausa de 45 a 90 segundos entre um anúncio e outro** (`sleep 60` no Bash). O ritmo calmo protege a conta.
4. **Confirmação humana antes do lote**: mostre a lista do que pretende fazer (título, preço, ação) e espere o "sim".
5. **Se o Facebook mostrar qualquer aviso, verificação, bloqueio ou captcha: PARE imediatamente.** Tire um screenshot, avise o usuário para resolver manualmente e encerre a rodada. Nunca tente contornar.
6. **Nunca** interaja com mensagens/chats de compradores, grupos ou qualquer outra área do Facebook — só Marketplace > Seus anúncios e o formulário de criação.
7. **Nunca exclua** um anúncio do Marketplace sem confirmação explícita do usuário naquele momento.

## Como operar o navegador (chrome-mcp) — validado em teste real (01/07/2026)

- **Sempre passe `tabId`** em toda chamada e trabalhe numa janela própria (`chrome_navigate` com `newWindow: true` na primeira navegação).
- **`chrome_click_element` com XPath + tabId funciona no Facebook** para comboboxes, opções (`//*[@role="option"][contains(., "À venda")]`), botões (Avançar, Publicar, Fechar) — foi o caminho que publicou o anúncio de teste. `chrome_fill_or_select` funciona para inputs e textarea.
- **NUNCA use `chrome_computer` com coordenadas**: ele age na janela que o USUÁRIO está com foco, ignorando o tabId — no teste, clicou duas vezes em outra janela do operador. Os `ref`s do `chrome_read_page` também expiram entre chamadas HTTP; não confie neles.
- **Exceção `isTrusted`**: o autocomplete de LOCALIZAÇÃO ignora cliques e teclas sintéticas. Solução validada: peça o clique ao usuário — `chrome_request_element_selection` (atenção: expira em ~120s) ou simplesmente instrua "clique na primeira sugestão da cidade" e aguarde a confirmação. É UM clique humano por anúncio novo; o resto é automático.
- **`chrome_javascript` exige `return`** no código (ele embrulha numa função; sem return vem `"undefined"`). O resultado passa por um sanitizador que censura strings parecidas com token (`[BLOCKED: ...]`) — retorne pathnames e dados curtos, nunca URLs completas com query.
- Fotos: `chrome_upload_file` com `filePath` **absoluto** (ex.: `c:\...\catalogo\fotos\9258\01-9266.jpeg`) e `multiple: true` quando o campo aceitar várias. Funciona mesmo com o `input[type=file]` escondido. Antes de montar os caminhos, liste a pasta `catalogo/fotos/<id>/` (as extensões variam). Respeite o limite de fotos que o formulário indicar, priorizando as primeiras (a `01-...` é a capa).
- Confira o resultado do que fez com `chrome_screenshot` (`storeBase64: true` para você ver; salve o PNG de confirmação em `estado/logs/`).
- Se não encontrar um elemento depois de ~3 tentativas, use `chrome_request_element_selection` para pedir que o próprio usuário clique nele.
- Se as ferramentas do navegador sumirem no meio da sessão, o servidor local caiu: peça ao usuário para conferir se o Chrome está aberto e a extensão diz "Conectado", e tente de novo.

## Montando o anúncio no Marketplace — fluxo validado (01/07/2026)

1. Abra `https://www.facebook.com/marketplace/create/rental` (serve para venda E aluguel).
2. Combobox "Imóvel residencial para venda ou locação": selecione **"À venda"** ou "Aluguel" conforme `negocio`.
3. Combobox "Tipo de imóvel" — só existem **Apartamento, Casa e Sobrado geminado**. Mapeamento do `tipo` do catálogo: Apartamento/Kitnet → Apartamento; Casa/Duplex → Casa. **Lote, Terra, Galpão, Prédio, Ponto/Comercial NÃO cabem** neste formulário: pule e liste no resumo final para o Estêvão decidir (não improvise categoria).
4. Campos por rótulo (ids `_r_*` mudam a cada sessão — localize o input pelo `label` que o envolve): Número de quartos, Número de banheiros, Preço (só dígitos; o Facebook formata), Descrição do imóvel (textarea), e opcionais Metros quadrados / IPTU / Condomínio quando o catálogo tiver.
5. **Não existe campo de título** — o Facebook gera sozinho (ex.: "2 quartos 1 banheiro Apartamento"). Grave esse título gerado no estado (`tituloPublicado`).
6. Localização: preencha com `cidade` e **peça ao usuário para clicar na primeira sugestão** (única etapa que exige clique humano — ver seção acima). O "Avançar" só habilita depois disso.
7. Fotos: `input[type="file"][accept*="image"]` — uma chamada de `chrome_upload_file` por foto **acumula** (não substitui). Limite: 50.
8. "Avançar" → página de audiência ("Anunciar publicamente" + "Anunciar nos seus grupos", máx. 20):
   - Leia a lista de grupos exibida (nome + nº de membros) e sincronize com `estado/grupos.json`: grupos novos entram com `usar: false` (avise no resumo), grupos que sumiram saem — sempre preservando as escolhas existentes.
   - **Primeira vez** (`configurado: false`): apresente a lista numerada ao usuário e pergunte em quais grupos ele quer publicar (pode ser "nenhum"). Grave a escolha com `configurado: true`. Isso acontece uma única vez — nas próximas, aplique direto.
   - Marque os grupos com `usar: true` clicando na linha de cada um (`chrome_click_element` + XPath pelo nome). Confira se marcou (screenshot ou `aria-checked`); se o clique sintético não pegar, peça ao usuário para clicar nos grupos que você indicar (mesmo padrão da localização).
   - Para mudar a escolha depois, existe a skill `configurar-grupos`.
9. "Publicar" → fecha o modal "Turbine seu classificado" clicando em "Fechar" (**nunca** "Turbinar" — é pago).
10. O classificado nasce **"em análise"** e SEM link do item disponível. Registre `tituloPublicado` e `linkMarketplace: null`; capture o link na rodada seguinte abrindo o card em "Seus classificados".
- Preço `null` com `precoTexto` ("Consulte"): pergunte ao usuário o que fazer com esse anúncio.
- Descrição: use `descricao` do catálogo em parágrafos curtos; mantenha os telefones que já estão no texto. Não invente dados — o que não estiver no catálogo fica de fora.

## Aviso permanente

Este uso é legítimo (anúncios reais do próprio corretor), mas o Facebook pode restringir contas que publicam em volume. As regras de ouro acima existem por isso. Na dúvida, publique menos.
