# Roteiro de instalação — para o assistente Claude na máquina do operador

Você (Claude) está lendo isto porque o operador pediu para instalar o Republicador de Anúncios nesta máquina. Ele é **leigo em tecnologia**: fale em português simples, sem jargão ("o navegador", "o programa", nunca "MCP", "bridge", "npm"), uma pergunta por vez, e avise em uma frase antes de cada etapa demorada. A pessoa que dá suporte é o Estêvão; se algo travar, diga para o operador mandar mensagem para ele com uma foto da tela.

Esta pasta já deve ser a pasta definitiva do projeto (ex.: `Documentos\anuncios-imoveis-ruy`). Se ela ainda estiver dentro de Downloads ou tiver o nome `republicador-anuncios-imoveis-main`, mova/renomeie antes de continuar e diga ao operador onde ficou.

## Etapa 1 — Conferir o que já existe

Rode, no PowerShell, e interprete:

```powershell
Get-Command node, npm, claude -ErrorAction SilentlyContinue | Select-Object Name, Source
Test-Path 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\chrome.exe'
```

- **Google Chrome ausente**: peça para instalar em https://www.google.com/chrome/ e avise quando terminar.
- **Node ausente**: abra https://nodejs.org/pt/download para o operador, peça a versão LTS com instalação padrão ("Avançar" em tudo). Depois de instalado, o terminal atual **não enxerga** o Node: peça para fechar esta janela, abrir de novo, digitar `claude` e mandar o mesmo pedido de instalação outra vez. Encerre aqui.
- Tudo presente: siga.

## Etapa 2 — Rodar o instalador

Avise: "Vou instalar as peças do programa, leva uns 2 minutos." Então rode, de dentro desta pasta:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\Instalar.ps1 -SemPausa
```

- Código de saída 0 e a mensagem `[OK] Atalho "Republicar Anuncios" criado.` = deu certo.
- Qualquer `[ERRO]`: leia a mensagem, explique em palavras simples o que faltou e o que fazer. Não tente contornar o instalador na mão; se não for pré-requisito faltando, peça para chamar o Estêvão.
- O instalador imprime o **ID da extensão** e a pasta `%LOCALAPPDATA%\chrome-mcp-server`. Anote os dois para a etapa seguinte.

## Etapa 3 — Ligar a extensão no Chrome (o operador clica, você guia)

Esta parte não dá para automatizar. Peça UMA ação por vez e espere o "pronto":

1. "Abra o Google Chrome e, na barra de endereço, digite `chrome://extensions` e aperte Enter."
2. "No canto superior direito, ligue a chave **Modo do desenvolvedor**."
3. "Clique em **Carregar sem compactação** e escolha esta pasta:" — mostre o caminho completo já resolvido (rode `echo $env:LOCALAPPDATA\chrome-mcp-server` para exibir).
4. "Confira se apareceu um cartão da extensão com o ID `<id anotado>`."
5. "Clique no ícone de quebra-cabeça (canto superior direito do Chrome), depois na extensão, e no botão **Conectar**."

Confirme por conta própria:

```powershell
curl.exe -s --max-time 3 http://127.0.0.1:12306/ping
```

Deve responder `{"status":"ok"}`. Se não responder, peça para repetir o passo 5 (às vezes é preciso fechar e abrir o painel da extensão). Tente até 3 vezes; depois peça para chamar o Estêvão.

## Etapa 4 — Facebook

Pergunte: "No Chrome, você já está com a sua conta do Facebook aberta?" Se não, peça para entrar agora. Não faça nada no Facebook nesta instalação — só confirme o login.

## Etapa 5 — Encerrar

Diga ao operador, nesta ordem:

1. A instalação terminou. Apareceu um atalho **"Republicar Anuncios"** na área de trabalho: é por ele que se usa o programa, toda semana, com dois cliques.
2. A **primeira rodada deve ser feita com o Estêvão acompanhando** (chamada com tela compartilhada), porque ela escolhe os grupos do Facebook e mostra como responder às perguntas.
3. O guia do dia a dia é o arquivo `LEIA-ME.md` dentro da pasta.
4. Nunca digite `npm update -g` nem remova a extensão do Chrome: isso quebra o programa.

Termine com um resumo de 3 linhas: o que foi instalado, o que ficou pendente (se algo ficou) e o próximo passo.
