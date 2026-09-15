# Launcher do Republicador de Anuncios (2 cliques via atalho na area de trabalho).
# NOTA: sem caracteres acentuados neste arquivo de proposito - o PowerShell 5.1
# le UTF-8 sem BOM como CP-1252 e quebra o parser com acentos.

$ErrorActionPreference = 'Stop'
trap {
    Write-Host ''
    Write-Host "[ERRO INESPERADO] $_" -ForegroundColor Red
    Write-Host 'Tire uma foto desta tela e mande para o suporte.' -ForegroundColor Yellow
    Read-Host 'Pressione ENTER para fechar'
    exit 1
}
$raiz = Split-Path -Parent $PSCommandPath
Set-Location $raiz

function Falha([string]$msg) {
    Write-Host ''
    Write-Host "[PROBLEMA] $msg" -ForegroundColor Red
    Write-Host ''
    Read-Host 'Pressione ENTER para fechar'
    exit 1
}

Write-Host '=========================================' -ForegroundColor Cyan
Write-Host '  Republicador de Anuncios - Marcos Peres' -ForegroundColor Cyan
Write-Host '=========================================' -ForegroundColor Cyan
Write-Host ''

# 1) Ferramentas necessarias
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Falha 'O programa "Node" nao foi encontrado. Rode o Instalar.ps1 ou chame o suporte.'
}
if (-not (Get-Command claude -ErrorAction SilentlyContinue)) {
    Falha 'O programa "Claude" nao foi encontrado. Rode o Instalar.ps1 ou chame o suporte.'
}

# 2) Chrome aberto com a extensao conectada (servidor local na porta 12306)
function Test-ChromeConectado {
    try {
        $r = Invoke-RestMethod -Uri 'http://127.0.0.1:12306/ping' -TimeoutSec 3
        return ($r.status -eq 'ok')
    } catch { return $false }
}

if (-not (Test-ChromeConectado)) {
    Write-Host 'O Chrome ainda nao esta conectado. Abrindo o Chrome...' -ForegroundColor Yellow
    try {
        Start-Process 'chrome'
    } catch {
        Write-Host 'Nao consegui abrir o Chrome sozinho. Abra o Google Chrome voce' -ForegroundColor Yellow
        Write-Host 'mesmo pelo menu Iniciar antes de continuar.' -ForegroundColor Yellow
    }
    Write-Host ''
    Write-Host 'Se pedir, clique no icone da extensao (quebra-cabeca no canto' -ForegroundColor Yellow
    Write-Host 'superior direito do Chrome) e depois no botao Conectar.' -ForegroundColor Yellow
    Write-Host 'Aguardando a conexao (ate 2 minutos)...' -ForegroundColor Yellow
    $conectou = $false
    for ($i = 0; $i -lt 24; $i++) {
        Start-Sleep -Seconds 5
        if (Test-ChromeConectado) { $conectou = $true; break }
    }
    if (-not $conectou) {
        Falha 'Nao consegui conectar ao Chrome. Confira se a extensao esta instalada e diz "Conectado", e tente de novo.'
    }
}
Write-Host '[OK] Chrome conectado.' -ForegroundColor Green
Write-Host ''
Write-Host 'Abrindo o assistente. Ele vai conferir o site e te guiar.' -ForegroundColor Cyan
Write-Host 'IMPORTANTE: nao feche esta janela nem o Chrome durante o processo.' -ForegroundColor Yellow
Write-Host ''

# 3) Sessao do Claude ja com a rotina de republicacao
& claude '/republicar'

Write-Host ''
Read-Host 'Rodada encerrada. Pressione ENTER para fechar'
