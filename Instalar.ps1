# Instalador (rodar UMA vez na maquina do operador, como usuario normal).
# Prepara: bridge do Chrome (com patch), extensao, atalho na area de trabalho.
# NOTA: sem caracteres acentuados neste arquivo de proposito - o PowerShell 5.1
# le UTF-8 sem BOM como CP-1252 e quebra o parser com acentos.
#
# Pre-requisitos ja instalados manualmente antes deste script:
#   - Google Chrome
#   - Node.js LTS (https://nodejs.org)
#   - Claude Code logado (irm https://claude.ai/install.ps1 | iex ; depois rodar: claude)
#
# Este script espera as pastas do pacote:
#   instalador\extensao\     -> build da extensao chrome-mcp (manifest.json COM campo "key")
#   instalador\bridge-dist\  -> dist patcheado do mcp-chrome-bridge (patch multi-sessao)

# -SemPausa: nao espera ENTER no final nem em erro (uso quando o instalador e rodado
# pelo assistente Claude dentro de uma sessao, e nao por 2 cliques).
param([switch]$SemPausa)

$ErrorActionPreference = 'Stop'
trap {
    Write-Host ''
    Write-Host "[ERRO INESPERADO] $_" -ForegroundColor Red
    Write-Host 'Tire uma foto desta tela e mande para o suporte.' -ForegroundColor Yellow
    if (-not $SemPausa) { Read-Host 'Pressione ENTER para fechar' }
    exit 1
}
$raiz = Split-Path -Parent $PSCommandPath

function Passo([string]$msg) { Write-Host ''; Write-Host "==> $msg" -ForegroundColor Cyan }
function Falha([string]$msg) {
    Write-Host "[ERRO] $msg" -ForegroundColor Red
    if (-not $SemPausa) { Read-Host 'Pressione ENTER para fechar' }
    exit 1
}

Write-Host '================================================' -ForegroundColor Cyan
Write-Host '  Instalador - Republicador de Anuncios' -ForegroundColor Cyan
Write-Host '================================================' -ForegroundColor Cyan

# 0) Pacote extraido e pre-requisitos
if ($raiz -like (Join-Path $env:TEMP '*') -or -not (Test-Path (Join-Path $raiz 'instalador'))) {
    Falha 'Parece que o instalador foi aberto de dentro do arquivo ZIP. Extraia (descompacte) a pasta inteira - por exemplo para Documentos - e rode o Instalar.ps1 de dentro dela.'
}

Passo 'Conferindo pre-requisitos'
$chromeOk = (Test-Path 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\chrome.exe') -or
            (Test-Path 'HKCU:\Software\Microsoft\Windows\CurrentVersion\App Paths\chrome.exe')
if (-not $chromeOk) {
    Start-Process 'https://www.google.com/chrome/'
    Falha 'Google Chrome nao encontrado. Instale pelo site que abriu e rode este instalador de novo.'
}
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Start-Process 'https://nodejs.org/pt/download'
    Falha 'Node.js nao encontrado. Instale pelo site que abriu (versao LTS) e rode este instalador de novo.'
}
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) { Falha 'npm nao encontrado (deveria vir com o Node.js).' }
Write-Host '[OK] Chrome e Node encontrados. Node:' (node --version)

# 1) Bridge do Chrome (native messaging host + servidor local)
Passo 'Instalando o bridge do Chrome (mcp-chrome-bridge)'
npm install -g mcp-chrome-bridge@1.0.31
if ($LASTEXITCODE -ne 0) { Falha 'Falha ao instalar o mcp-chrome-bridge via npm.' }
# Redirecao de stderr feita no cmd: com $ErrorActionPreference=Stop, "2>$null" no
# PowerShell 5.1 converte qualquer aviso em stderr em erro terminante.
cmd /c "mcp-chrome-bridge register 2>nul"
if ($LASTEXITCODE -ne 0) { Falha 'Falha ao registrar o bridge do Chrome. Chame o suporte.' }

# 2) Patch multi-sessao (sem ele, as ferramentas do navegador somem da sessao)
Passo 'Aplicando patch no bridge'
$bridgeDistOrigem = Join-Path $raiz 'instalador\bridge-dist'
$globalRoot = (@(& npm root -g) | Select-Object -Last 1).Trim()
$bridgeDistDestino = Join-Path $globalRoot 'mcp-chrome-bridge\dist'
if (-not (Test-Path $bridgeDistOrigem)) { Falha "Pasta do pacote nao encontrada: $bridgeDistOrigem" }
if (-not (Test-Path $bridgeDistDestino)) { Falha "Bridge global nao encontrado em: $bridgeDistDestino" }
Copy-Item -Path (Join-Path $bridgeDistOrigem '*') -Destination $bridgeDistDestino -Recurse -Force
Write-Host '[OK] Patch aplicado.'
Write-Host '[LEMBRETE] Nunca rode "npm update -g": isso desfaz o patch.' -ForegroundColor Yellow

# 3) Extensao do Chrome (copia local estavel) + ID derivado da key real do pacote
Passo 'Copiando a extensao do Chrome'
$extOrigem = Join-Path $raiz 'instalador\extensao'
$extDestino = Join-Path $env:LOCALAPPDATA 'chrome-mcp-server'
if (-not (Test-Path (Join-Path $extOrigem 'manifest.json'))) { Falha "Extensao nao encontrada em: $extOrigem" }
$manifestExt = Get-Content (Join-Path $extOrigem 'manifest.json') -Raw | ConvertFrom-Json
if (-not $manifestExt.key) {
    Falha 'A extensao do pacote nao tem o campo "key" no manifest.json - o ID mudaria a cada maquina. Empacote o build correto (ver README.md).'
}
# ID de extensao Chrome = 16 primeiros bytes do SHA-256 da key, em alfabeto a-p.
$sha = [Security.Cryptography.SHA256]::Create().ComputeHash([Convert]::FromBase64String($manifestExt.key))
$hex = -join ($sha[0..15] | ForEach-Object { $_.ToString('x2') })
$EXT_ID = -join ($hex.ToCharArray() | ForEach-Object { [char]([Convert]::ToInt32([string]$_, 16) + [int][char]'a') })
New-Item -ItemType Directory -Force -Path $extDestino | Out-Null
Copy-Item -Path (Join-Path $extOrigem '*') -Destination $extDestino -Recurse -Force
Write-Host "[OK] Extensao copiada para: $extDestino (ID: $EXT_ID)"

# 4) Autorizar a extensao no native host (allowed_origins)
Passo 'Autorizando a extensao no bridge'
$manifestHost = Join-Path $env:APPDATA 'Google\Chrome\NativeMessagingHosts\com.chromemcp.nativehost.json'
if (-not (Test-Path $manifestHost)) { Falha "Manifest do native host nao encontrado: $manifestHost (o passo 1 falhou?)" }
$json = Get-Content $manifestHost -Raw | ConvertFrom-Json
$origem = "chrome-extension://$EXT_ID/"
if ($json.allowed_origins -notcontains $origem) {
    $json.allowed_origins = @($json.allowed_origins) + $origem
    $json | ConvertTo-Json -Depth 5 | Set-Content -Path $manifestHost -Encoding UTF8
    Write-Host '[OK] Extensao autorizada.'
} else {
    Write-Host '[OK] Extensao ja estava autorizada.'
}

# 5) Atalho na area de trabalho
Passo 'Criando o atalho na area de trabalho'
$ws = New-Object -ComObject WScript.Shell
$atalho = $ws.CreateShortcut([IO.Path]::Combine([Environment]::GetFolderPath('Desktop'), 'Republicar Anuncios.lnk'))
$atalho.TargetPath = 'powershell.exe'
$atalho.Arguments = "-NoProfile -ExecutionPolicy Bypass -File `"$raiz\Republicar.ps1`""
$atalho.WorkingDirectory = $raiz
$atalho.Save()
Write-Host '[OK] Atalho "Republicar Anuncios" criado.'

# 6) Passos manuais finais (nao da para automatizar)
Passo 'FALTAM ESTES PASSOS MANUAIS:'
Write-Host '  1. Abra o Chrome e digite na barra:  chrome://extensions'
Write-Host '  2. Ligue o "Modo do desenvolvedor" (canto superior direito).'
Write-Host '  3. Clique em "Carregar sem compactacao" e escolha a pasta:'
Write-Host "     $extDestino" -ForegroundColor Cyan
Write-Host "     (confira se o ID exibido e: $EXT_ID)"
Write-Host '  4. Clique no icone da extensao e no botao Conectar.'
Write-Host '  5. Rode o atalho "Republicar Anuncios" UMA vez com o tecnico presente,'
Write-Host '     para aceitar as confirmacoes iniciais do Claude (confianca da pasta).'
Write-Host ''

# Resumo final honesto: se falta o Claude, dizer com destaque.
if (-not (Get-Command claude -ErrorAction SilentlyContinue)) {
    Write-Host '[ATENCAO] INSTALACAO INCOMPLETA: o programa Claude NAO esta instalado.' -ForegroundColor Red
    Write-Host 'O atalho NAO vai funcionar ainda. Instale com o comando abaixo e faca login:' -ForegroundColor Red
    Write-Host '    irm https://claude.ai/install.ps1 | iex' -ForegroundColor Yellow
    Write-Host '    claude' -ForegroundColor Yellow
} else {
    Write-Host 'Depois dos passos acima, e so usar o atalho "Republicar Anuncios".' -ForegroundColor Green
}
Write-Host ''
if (-not $SemPausa) { Read-Host 'Pressione ENTER para fechar' }
