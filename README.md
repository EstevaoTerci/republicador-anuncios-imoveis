# anuncios-imoveis-ruy (documentação de desenvolvimento)

Ferramenta de republicação semanal dos anúncios de https://marcosperesimoveis.com.br/ no Facebook Marketplace, operada por um usuário leigo via Claude Code + chrome-mcp (fork em `juarez/apps/chrome-mcp-extension`).

Guia do usuário final: [LEIA-ME.md](LEIA-ME.md). Regras de operação da sessão: [CLAUDE.md](CLAUDE.md).

## Componentes

| Peça | Papel |
| --- | --- |
| `scripts/coleta.mjs` | Coleta via WP REST API (`/wp-json/wp/v2/property`, metadados em `cmb2`); catálogo + diff + download de fotos em alta (remove sufixo `-WxH`) |
| `scripts/lote.mjs` | Lote da semana determinístico (prioridade, 7 dias, tipos aceitos, limite 10) + `ficha <id>` com campos do formulário e caminhos das fotos + `links` pendentes. Grava `estado/lote-atual.json` |
| `scripts/estado.mjs` | Única forma de gravar `estado/publicados.json` (publicado/renovado/link/removido-site/removido/erro/mostrar) |
| `.claude/skills/republicar` | Rotina semanal completa (o atalho dispara `claude "/republicar"`); roteiro explícito pensado para rodar também no Sonnet |
| `.claude/skills/atualizar-catalogo` | Só coleta + resumo de mudanças |
| `.claude/skills/configurar-grupos` | Liga/desliga grupos do Facebook onde publicar (escolha salva em `estado/grupos.json`, capturada na 1ª publicação) |
| `.mcp.json` | chrome-mcp direto via HTTP (`http://127.0.0.1:12306/mcp`) |
| `Republicar.ps1` | Launcher do atalho (preflight: node, claude, `/ping` do bridge) |
| `Instalar.ps1` | Setup de 1ª vez na máquina do operador |
| `estado/publicados.json` | Rastreio do que está no Marketplace (renovação a cada 7 dias) |

## Instalação por prompt (caminho principal)

Repositório público: https://github.com/EstevaoTerci/republicador-anuncios-imoveis. O operador instala Chrome + Node LTS + Claude Code e cola o prompt de [PROMPT-INSTALACAO.md](PROMPT-INSTALACAO.md); o Claude dele baixa o zip do repositório, roda `Instalar.ps1 -SemPausa` e guia os passos manuais seguindo [INSTALACAO-CLAUDE.md](INSTALACAO-CLAUDE.md). `catalogo/fotos/` e `estado/logs/` ficam fora do git (ver `.gitignore`).

## Empacotamento (alternativa: zip de entrega)

1. Copiar o build da extensão para `instalador/extensao/`. **Atenção à fonte**: o `manifest.json` precisa ter o campo `key` (o `Instalar.ps1` valida e deriva o ID dela; sem key ele aborta). A revisão constatou que `C:\Users\evert\.mcp-tools\chrome-mcp-server\` tem a key do ID **oficial** (`hbdg...`), enquanto o build do fork que o Chrome do dev realmente carrega (ID `bhok...`) está em `C:\Users\evert\Desktop\Projetos\assistente-inss\forks\mcp-chrome\app\chrome-extension\.output\chrome-mv3\` — na dúvida, rebuilde com `bash scripts/build-extension.sh` no juarez e empacote o output. Qualquer key embutida serve (o instalador se adapta); o importante é empacotar o build **testado**.
2. Copiar o dist patcheado do bridge para `instalador/bridge-dist/` (fonte: `C:\Users\evert\AppData\Roaming\nvm\v24.14.0\node_modules\mcp-chrome-bridge\dist\` — contém o patch multi-sessão; sem ele o 2º cliente MCP recebe HTTP 500).
3. Zipar a pasta do projeto **sem** `catalogo/fotos/` e `estado/logs/`.
4. Na máquina de destino: instalar Chrome + Node LTS + Claude Code (`irm https://claude.ai/install.ps1 | iex`, depois `claude` para login na assinatura), rodar `Instalar.ps1` e fazer os passos manuais que ele lista (carregar extensão + Conectar).
5. **Com o técnico ainda presente**: rodar o atalho "Republicar Anuncios" uma vez para aceitar o prompt de confiança da pasta e as aprovações iniciais do Claude Code — senão o primeiro uso do leigo trava num diálogo em inglês.

## Cuidados conhecidos

- **`npm update -g` na máquina do operador destrói o patch do bridge** (multi-sessão) — sintoma: tools `mcp__chrome-mcp__*` somem da sessão.
- Facebook (React) rejeita cliques sintéticos só no autocomplete de localização (`event.isTrusted`) — ali o usuário clica. No resto, `chrome_click_element` com XPath + `tabId` funciona; `chrome_computer` é proibido (age na janela em foco do usuário). Ver CLAUDE.md.
- `.ps1` sem acentos de propósito (PowerShell 5.1 + UTF-8 sem BOM = parser em CP-1252).
- O endpoint `statuses` do WP colide com o core; venda/aluguel vem de `cmb2.property_general.property_contract` (`SALE`/`RENT`).
