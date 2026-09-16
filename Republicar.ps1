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

# 1b) Atualizacao automatica: compara a versao publicada no repositorio com a instalada.
#     Se houver novidade, roda o Atualizar.ps1 (que preserva a pasta "estado"). Sem internet, segue normal.
try {
    $arqVersao = Join-Path $raiz 'estado\versao.txt'
    $instalada = if (Test-Path $arqVersao) { (Get-Content $arqVersao -Raw).Trim() } else { '' }
    $api = 'https://api.github.com/repos/EstevaoTerci/republicador-anuncios-imoveis/commits/main'
    $remota = (Invoke-RestMethod -Uri $api -Headers @{ 'User-Agent' = 'republicador' } -TimeoutSec 8).sha
    if ($remota -and $remota -ne $instalada) {
        Write-Host 'Encontrei uma atualizacao do programa. Aplicando (leva menos de 1 minuto)...' -ForegroundColor Yellow
        & powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $raiz 'Atualizar.ps1') -SemPausa
        if ($LASTEXITCODE -eq 0) {
            New-Item -ItemType Directory -Force -Path (Split-Path -Parent $arqVersao) | Out-Null
            Set-Content -Path $arqVersao -Value $remota
            Write-Host '[OK] Programa atualizado.' -ForegroundColor Green
            $marcaExt = Join-Path $raiz 'estado\extensao-atualizada.txt'
            if (Test-Path $marcaExt) {
                Write-Host ''
                Write-Host 'A extensao do Chrome foi atualizada. Para ela valer, o Chrome precisa ser reaberto:' -ForegroundColor Yellow
                Write-Host '  1. Feche TODAS as janelas do Google Chrome.' -ForegroundColor Yellow
                Write-Host '  2. Abra o Chrome de novo e entre no Facebook, se pedir.' -ForegroundColor Yellow
                Read-Host '  3. Depois disso, volte aqui e pressione ENTER para continuar'
                Remove-Item $marcaExt -Force
            }
        } else {
            Write-Host '[AVISO] Nao consegui atualizar agora. Seguindo com a versao atual.' -ForegroundColor Yellow
        }
    }
} catch {
    Write-Host '[AVISO] Nao consegui verificar atualizacoes (sem internet?). Seguindo com a versao atual.' -ForegroundColor Yellow
}
Write-Host ''

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

# 3) Sessao do Claude ja com a rotina de republicacao, sem perguntas de permissao
#    (o operador e leigo; as confirmacoes que importam sao feitas em conversa, pelas regras do CLAUDE.md)
& claude --dangerously-skip-permissions '/republicar'

Write-Host ''
Read-Host 'Rodada encerrada. Pressione ENTER para fechar'
