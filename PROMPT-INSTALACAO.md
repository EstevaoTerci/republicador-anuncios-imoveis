# Instalação por prompt (sem acesso remoto)

Escrito para o Claude do operador rodando no plano básico (modelo Sonnet): comandos prontos, ordem fixa, sem margem para improviso.

## O que o operador faz antes (ditar pela chamada)

1. Instalar o **Google Chrome** (se não tiver) e entrar na conta do Facebook nele.
2. Instalar o **Node.js LTS**: https://nodejs.org/pt/download (instalação padrão, "Avançar" em tudo).
3. Instalar o **Claude Code** e entrar na assinatura. Abrir o Terminal (botão direito no menu Iniciar → "Terminal") e digitar:
   ```powershell
   irm https://claude.ai/install.ps1 | iex
   ```
   Fechar o Terminal, abrir de novo e digitar `claude`. Fazer o login no navegador quando ele pedir.
4. Com o `claude` aberto no Terminal, **colar o prompt abaixo inteiro** e apertar Enter. Quando o Claude pedir permissão para rodar algo, responder "sim" (ou escolher a opção de permitir).

## Prompt para colar

```
Você vai instalar o programa "Republicador de Anúncios" nesta máquina Windows. Eu não entendo de tecnologia. Regras para falar comigo: português simples, sem termos técnicos, frases curtas, uma pergunta por vez, e me avise em uma frase antes de cada coisa demorada. Não instale nem altere nada além do que está descrito aqui e no roteiro que você vai ler. Não use git nem npm por conta própria.

ETAPA A — Baixar o programa. Rode este bloco no PowerShell exatamente como está, sem alterar:

$zip = "$env:TEMP\republicador.zip"
Invoke-WebRequest -Uri "https://github.com/EstevaoTerci/republicador-anuncios-imoveis/archive/refs/heads/main.zip" -OutFile $zip
$tmp = "$env:TEMP\republicador-extraido"
if (Test-Path $tmp) { Remove-Item $tmp -Recurse -Force }
Expand-Archive -Path $zip -DestinationPath $tmp -Force
$destino = Join-Path ([Environment]::GetFolderPath('MyDocuments')) 'anuncios-imoveis-ruy'
New-Item -ItemType Directory -Force -Path $destino | Out-Null
Copy-Item -Path "$tmp\republicador-anuncios-imoveis-main\*" -Destination $destino -Recurse -Force
Write-Output "PASTA=$destino"
Test-Path "$destino\Instalar.ps1"

Só siga se a última linha for True. Se for False ou der erro, me mostre a mensagem em palavras simples e pare.

ETAPA B — Ler o roteiro. Leia o arquivo INSTALACAO-CLAUDE.md que está dentro da pasta indicada em PASTA=. Ele tem 5 etapas numeradas. Siga-as na ordem, uma de cada vez, sem pular e sem adiantar etapas. Quando o roteiro mandar rodar o instalador, use o caminho completo: powershell -NoProfile -ExecutionPolicy Bypass -File "<PASTA>\Instalar.ps1" -SemPausa

ETAPA C — Quando terminar a etapa 5 do roteiro, me dê um resumo de 3 linhas: o que foi instalado, o que ficou pendente e qual é o próximo passo.

Comece agora pela ETAPA A.
```

## Depois da instalação

A primeira rodada é feita pelo atalho **"Republicar Anuncios"** da área de trabalho, com o Estêvão acompanhando por tela compartilhada (escolha dos grupos, clique na sugestão de cidade, confirmação do lote). Ver `entrega/ROTEIRO-INSTALACAO.md`, passos 8 a 10.
