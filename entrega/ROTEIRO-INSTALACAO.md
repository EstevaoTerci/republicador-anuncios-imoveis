# Roteiro de instalação na máquina do Ruy (~15 min, técnico presente)

## Antes de começar (pré-requisitos manuais)

1. **Google Chrome** instalado e **logado na conta do Facebook do Ruy**.
2. Ruy deve **entrar nos grupos de classificados da região** no Facebook (a escolha de grupos na primeira rodada lê os grupos da conta dele).
3. **Node.js LTS**: https://nodejs.org (instalação padrão, next-next-finish).
4. **Claude Code** logado na assinatura dele:
   ```powershell
   irm https://claude.ai/install.ps1 | iex
   claude    # faz o login e fecha
   ```

## Instalação

> Alternativa sem zip e sem acesso remoto: o operador cola o prompt de `PROMPT-INSTALACAO.md` no Claude dele, que baixa o repositório e faz os passos 5 a 7 guiando-o. O restante deste roteiro continua igual.

5. Copiar `republicador-anuncios-v1.zip` para a máquina e **extrair a pasta inteira** (ex.: `Documentos\anuncios-imoveis-ruy`) — não rodar de dentro do zip (o instalador detecta e recusa).
6. Botão direito em `Instalar.ps1` → **Executar com o PowerShell**. Ele confere pré-requisitos, instala o bridge (`mcp-chrome-bridge@1.0.31`) já com o patch multi-sessão, copia a extensão para `%LOCALAPPDATA%\chrome-mcp-server`, autoriza o ID dela no native host e cria o atalho "Republicar Anuncios" na área de trabalho.
7. Passo manual que o instalador lista no final: `chrome://extensions` → ligar **Modo do desenvolvedor** → **Carregar sem compactação** → escolher `%LOCALAPPDATA%\chrome-mcp-server` (conferir ID `bhoklmmjlkgocihffaaekegbijdcpcad`) → clicar no ícone da extensão → **Conectar**.

## Primeira rodada (com o técnico do lado)

8. Dar 2 cliques no atalho **"Republicar Anuncios"** e aceitar a confirmação de confiança da pasta (aparece uma vez). O atalho abre o Claude sem perguntas de permissão (`--dangerously-skip-permissions`; comandos perigosos como `npm update` estão bloqueados em `.claude/settings.json`).
9. Deixar a rodada acontecer supervisionada: o assistente vai atualizar o catálogo, propor o lote, **perguntar os grupos (uma vez só)** e pedir **1 clique na sugestão de cidade** por anúncio novo — mostrar ao Ruy como responder.
10. Conferir no Facebook (Marketplace → Seus classificados) que os anúncios entraram.

## Avisos permanentes (deixar anotado para o Ruy)

- **Nunca rodar `npm update -g`** — desfaz o patch do bridge (sintoma: o assistente diz que perdeu o navegador).
- Não remover a extensão do Chrome; se o Chrome reclamar de "extensão em modo desenvolvedor", só fechar o aviso.
- Se o Facebook pedir verificação/mostrar aviso, o assistente para sozinho: resolver com calma e tentar outro dia.
- Guia do dia a dia: `LEIA-ME.md` dentro da pasta.
