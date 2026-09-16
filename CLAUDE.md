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
- `scripts/lote.mjs` — monta o lote da semana (máx. 10, ordenado: remoções, renovações, novos; filtra tipos que o formulário não aceita, sem foto, sem preço) e a ficha de cada anúncio pronta para o formulário (`ficha <id>`). **Sempre use este script para decidir o lote; não faça a conta de cabeça.**
- `scripts/estado.mjs` — grava o estado (`publicado`, `renovado`, `link`, `removido-site`, `removido`, `erro`, `mostrar`). **Nunca edite `estado/publicados.json` à mão.**
- `estado/publicados.json` — o que já foi publicado no Marketplace (veja o esquema abaixo). Atualize após **cada** anúncio processado via `scripts/estado.mjs`, nunca só no final.
- `estado/grupos.json` — em quais grupos do Facebook publicar junto (escolha do usuário, feita uma vez na primeira publicação e editável pela skill `configurar-grupos`). Publicar em grupos aumenta alcance E o risco de sinalização: respeite a escolha, mas nunca marque grupos fora dela.
- `estado/logs/AAAA-MM-DD/` — screenshots de confirmação de cada publicação/renovação.
- `estado/aprendizados.json` + `scripts/aprendizado.mjs` — caderno de aprendizados (ver seção "Aprendizado contínuo"). É injetado automaticamente no início de cada sessão.
- `Atualizar.ps1` — atualiza o programa a partir do repositório preservando `estado/` e fotos. **Nunca** atualize copiando a pasta inteira por cima: isso apaga o estado.

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
2. **Máximo de ações no Marketplace por rodada = `maximoPorRodada` em `estado/config.json`** (padrão 10; criar, renovar ou remover, tudo somado). O `lote.mjs` já aplica o corte; não ultrapasse o que ele listou. Se houver mais pendentes, diga quantos ficaram para a próxima rodada. Para dar vazão a mais anúncios, é mais seguro rodar o atalho em mais dias da semana do que aumentar esse número.
3. **Pausa de 45 a 90 segundos entre um anúncio e outro** (`sleep 60` no Bash). O ritmo calmo protege a conta.
4. **Confirmação humana antes do lote**: mostre a lista do que pretende fazer (título, preço, ação) e espere o "sim".
5. **Se o Facebook mostrar qualquer aviso, verificação, bloqueio ou captcha: PARE imediatamente.** Tire um screenshot, avise o usuário para resolver manualmente e encerre a rodada. Nunca tente contornar.
6. **Nunca** interaja com mensagens/chats de compradores, grupos ou qualquer outra área do Facebook — só Marketplace > Seus anúncios e o formulário de criação.
7. **Nunca exclua** um anúncio do Marketplace sem confirmação explícita do usuário naquele momento.

## Como operar o navegador (chrome-mcp) — validado em teste real (01/07/2026)

- **Sempre passe `tabId`** em toda chamada e trabalhe numa janela própria (`chrome_navigate` com `newWindow: true` na primeira navegação).
- **`chrome_click_element` com XPath + tabId funciona no Facebook** para comboboxes, opções (`//*[@role="option"][contains(., "À venda")]`), botões (Avançar, Publicar, Fechar) — foi o caminho que publicou o anúncio de teste. `chrome_fill_or_select` funciona para inputs e textarea.
- **NUNCA use `chrome_computer` com coordenadas**: ele age na janela que o USUÁRIO está com foco, ignorando o tabId — no teste, clicou duas vezes em outra janela do operador. Os `ref`s do `chrome_read_page` também expiram entre chamadas HTTP; não confie neles.
- **Exceção `isTrusted`**: o autocomplete de LOCALIZAÇÃO ignora cliques por seletor (`chrome_click_element` com `selector`/XPath, que usa `element.click()` sintético). **Solução validada em 15/09/2026, sem clique humano**: `chrome_click_element` com `coordinates` (x, y do centro da opção, em pixels da janela, obtidos com `getBoundingClientRect` após `scrollIntoView`) gera um evento confiável e seleciona a sugestão. O fluxo completo está no passo 9 da skill `republicar`. Só se isso falhar 3 vezes é que se pede o clique ao usuário.
- **`chrome_javascript` exige `return`** no código (ele embrulha numa função; sem return vem `"undefined"`). O resultado passa por um sanitizador que censura strings parecidas com token (`[BLOCKED: ...]`) — retorne pathnames e dados curtos, nunca URLs completas com query.
- Fotos: `chrome_upload_file` com `filePath` **absoluto** (ex.: `c:\...\catalogo\fotos\9258\01-9266.jpeg`) e `multiple: true` quando o campo aceitar várias. Funciona mesmo com o `input[type=file]` escondido. Antes de montar os caminhos, liste a pasta `catalogo/fotos/<id>/` (as extensões variam). Respeite o limite de fotos que o formulário indicar, priorizando as primeiras (a `01-...` é a capa).
- Confira o resultado do que fez com `chrome_screenshot` (`storeBase64: true` para você ver; salve o PNG de confirmação em `estado/logs/`).
- Se não encontrar um elemento depois de ~3 tentativas, use `chrome_request_element_selection` para pedir que o próprio usuário clique nele.
- Se as ferramentas do navegador sumirem no meio da sessão, o servidor local caiu: peça ao usuário para conferir se o Chrome está aberto e a extensão diz "Conectado", e tente de novo. Se a resposta for `Invalid MCP request or session`, a extensão foi recarregada/atualizada com a sessão aberta e a conexão desta sessão ficou inválida: não adianta repetir; peça ao usuário para fechar a janela do assistente e abrir o atalho de novo (o `Republicar.ps1` já faz a atualização da extensão ANTES de abrir o assistente justamente por isso).

## Montando o anúncio no Marketplace — fluxo validado (01/07/2026)

1. Abra `https://www.facebook.com/marketplace/create/rental` (serve para venda E aluguel).
2. Combobox "Imóvel residencial para venda ou locação": selecione **"À venda"** ou "Aluguel" conforme `negocio`, **antes de qualquer outro campo, e confira que pegou**. O padrão do Facebook é aluguel: no teste de 15/09/2026 o preço saiu "R$ 230.000/mês" porque a seleção não foi conferida.
3. Combobox "Tipo de imóvel" — só existem **Apartamento, Casa e Sobrado geminado**. Mapeamento do `tipo` do catálogo: Apartamento/Kitnet → Apartamento; Casa/Duplex → Casa. **Lote, Terra, Galpão, Prédio, Ponto/Comercial não existem** neste formulário. O que fazer com eles é decidido por `estado/config.json` (`publicarNaoResidencialComo`): se estiver preenchido (hoje: "Apartamento"), o `lote.mjs` os inclui com esse tipo e a `ficha` já coloca o título real do site no início da descrição; se for `null`, eles ficam de fora e vão listados no resumo. Use sempre o que a `ficha` mandar; não decida a categoria por conta própria.
4. Campos por rótulo (ids `_r_*` mudam a cada sessão — localize o input pelo `label` que o envolve): Número de quartos e Número de banheiros são **obrigatórios na prática** (sem eles o título sai só "Casa" e o anúncio fica incompleto; confira o valor depois de preencher), Preço (só dígitos; o Facebook formata), Descrição do imóvel (textarea), e opcionais Metros quadrados / IPTU / Condomínio quando o catálogo tiver.
5. **Não existe campo de título** — o Facebook gera sozinho (ex.: "2 quartos 1 banheiro Apartamento"). Grave esse título gerado no estado (`tituloPublicado`).
6. Localização: o campo é o `input[role="combobox"][aria-label=""]` (abaixo do Preço). Digite **"Cidade, UF"** (a ficha já traz pronto; só "Mantena" lista dez ruas antes da cidade). As sugestões vêm como `[role="option"]`, muitas são ruas; a certa termina em "Cidade" (ex.: "35290-000 Mantena, MG Cidade" ou "Mantena, MG Cidade"). Selecione-a por **coordenadas** (ver seção acima). Sucesso = valor do input vira a cidade, `aria-expanded="false"` e "Avançar" habilita.
7. Fotos: `input[type="file"][accept*="image"]` — a ferramenta aceita **um arquivo por chamada** (`filePath`, sempre com `multiple: false`); as chamadas acumulam. **Confira o contador do Facebook** ("N/50", no texto da seção Fotos) antes e depois de CADA envio: tem que subir exatamente 1. **Se subir 2, PARE de enviar fotos**: é a extensão sem a correção de 15/09/2026 (ela disparava um segundo evento "change" e o Facebook processava o arquivo duas vezes; remover uma cópia remove as duas e a galeria fica inconsistente). Nesse caso feche o formulário sem salvar, registre no caderno e peça ao usuário para rodar o `Atualizar.ps1` e reabrir o Chrome. Espere ~2 s entre um envio e outro (o campo é recriado e a chamada imediata falha com "Could not find node"). Limite: 50.
8. "Avançar" → página de audiência ("Anunciar publicamente" + "Anunciar nos seus grupos", máx. 20):
   - Leia a lista de grupos exibida (nome + nº de membros) e sincronize com `estado/grupos.json`: grupos novos entram com `usar: false` (avise no resumo), grupos que sumiram saem — sempre preservando as escolhas existentes.
   - **Primeira vez** (`configurado: false`): apresente a lista numerada ao usuário e pergunte em quais grupos ele quer publicar (pode ser "nenhum"). Grave a escolha com `configurado: true`. Isso acontece uma única vez — nas próximas, aplique direto.
   - Marque os grupos com `usar: true` clicando na linha de cada um (`chrome_click_element` + XPath pelo nome). Confira se marcou (screenshot ou `aria-checked`); se o clique sintético não pegar, peça ao usuário para clicar nos grupos que você indicar (mesmo padrão da localização).
   - Para mudar a escolha depois, existe a skill `configurar-grupos`.
9. "Publicar" → fecha o modal "Turbine seu classificado" clicando em "Fechar" (**nunca** "Turbinar" — é pago).
10. O classificado nasce **"em análise"** e SEM link do item disponível. Registre `tituloPublicado` e `linkMarketplace: null`; capture o link na rodada seguinte abrindo o card em "Seus classificados".
- Preço `null` com `precoTexto` ("Consulte"): pergunte ao usuário o que fazer com esse anúncio.
- Descrição: use `descricao` do catálogo em parágrafos curtos; mantenha os telefones que já estão no texto. Não invente dados — o que não estiver no catálogo fica de fora.

## Aprendizado contínuo (obrigatório)

O caderno `estado/aprendizados.json` aparece no início de cada sessão (injetado pela inicialização). Regras:

1. **Antes de tentar resolver um problema, procure no caderno.** Se já existe uma solução para a mesma etapa/problema, aplique-a primeiro. Se funcionar, rode `node scripts/aprendizado.mjs confirmar <n>`.
2. **Registre no momento em que acontecer**, não no fim da rodada, sempre que: algo falhou e você precisou de uma segunda tentativa ou de um caminho alternativo; um elemento do Facebook não foi encontrado com o XPath esperado e outro funcionou; um comando ou script deu erro; o usuário precisou intervir de um jeito não previsto no roteiro; o Facebook mostrou uma tela nova.
   `node scripts/aprendizado.mjs registrar --etapa "<etapa>" --problema "<o que deu errado, concreto>" --solucao "<o que funcionou, concreto o bastante para repetir>"`
   Se ainda não achou solução: `--pendente` no lugar de `--solucao`, e volte com `resolver <n> --solucao ...` quando achar.
3. Problema e solução devem ser **concretos e reproduzíveis** ("botão Renovar não aparece na página do item; aparece em Seus classificados, dentro do card, XPath //span[text()='Renovar anúncio']"), nunca vagos ("deu erro, tentei de novo").
4. Não registre o que já está escrito neste CLAUDE.md nem o que é só instabilidade passageira (site lento, internet caiu). Registre padrões.
5. No resumo final da rodada, diga em uma linha quantos aprendizados novos foram registrados. O Estêvão revisa o caderno de tempos em tempos e promove os confirmados para este CLAUDE.md.

## Aviso permanente

Este uso é legítimo (anúncios reais do próprio corretor), mas o Facebook pode restringir contas que publicam em volume. As regras de ouro acima existem por isso. Na dúvida, publique menos.
