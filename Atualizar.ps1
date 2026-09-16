# Atualiza os arquivos do programa a partir do repositorio, SEM mexer na pasta "estado"
# (publicados, grupos, config, aprendizados, logs) nem nas fotos ja baixadas.
# Tambem renova a copia da extensao do Chrome (em %LOCALAPPDATA%\chrome-mcp-server) quando ela mudou;
# nesse caso o Chrome precisa ser fechado e aberto de novo para carregar a versao nova.
# NOTA: sem caracteres acentuados neste arquivo de proposito - o PowerShell 5.1
# le UTF-8 sem BOM como CP-1252 e quebra o parser com acentos.
#
# Uso: botao direito > Executar com o PowerShell   (ou:  powershell -File .\Atualizar.ps1 -SemPausa)

param([switch]$SemPausa)

$ErrorActionPreference = 'Stop'
trap {
    Write-Host ''
    Write-Host "[ERRO INESPERADO] $_" -ForegroundColor Red
    if (-not $SemPausa) { Read-Host 'Pressione ENTER para fechar' }
    exit 1
}

$raiz = Split-Path -Parent $PSCommandPath
$url = 'https://github.com/EstevaoTerci/republicador-anuncios-imoveis/archive/refs/heads/main.zip'
$zip = Join-Path $env:TEMP 'republicador.zip'
$tmp = Join-Path $env:TEMP 'republicador-extraido'
$preservar = @('estado', 'catalogo\fotos')

Write-Host '==> Baixando a versao mais recente...' -ForegroundColor Cyan
Invoke-WebRequest -Uri $url -OutFile $zip
if (Test-Path $tmp) { Remove-Item $tmp -Recurse -Force }
Expand-Archive -Path $zip -DestinationPath $tmp -Force
$origem = Join-Path $tmp 'republicador-anuncios-imoveis-main'
if (-not (Test-Path (Join-Path $origem 'Instalar.ps1'))) { throw 'O pacote baixado nao tem o conteudo esperado.' }

# Arquivos de estado que nao existem ainda (instalacao antiga) ganham o modelo do repositorio
$modelos = @('estado\config.json', 'estado\grupos.json', 'estado\publicados.json')
foreach ($m in $modelos) {
    $dest = Join-Path $raiz $m
    $src = Join-Path $origem $m
    if (-not (Test-Path $dest) -and (Test-Path $src)) {
        New-Item -ItemType Directory -Force -Path (Split-Path -Parent $dest) | Out-Null
        Copy-Item $src $dest
        Write-Host "    criado: $m"
    }
}

Write-Host '==> Copiando arquivos (preservando estado e fotos)...' -ForegroundColor Cyan
foreach ($p in $preservar) {
    $dir = Join-Path $origem $p
    if (Test-Path $dir) { Remove-Item $dir -Recurse -Force }
}
Copy-Item -Path (Join-Path $origem '*') -Destination $raiz -Recurse -Force

# Extensao do Chrome: renova a copia instalada se o conteudo mudou
$extInstalada = Join-Path $env:LOCALAPPDATA 'chrome-mcp-server'
$extPacote = Join-Path $raiz 'instalador\extensao'
$extensaoMudou = $false
if ((Test-Path (Join-Path $extInstalada 'manifest.json')) -and (Test-Path (Join-Path $extPacote 'background.js'))) {
    $hashNovo = (Get-FileHash (Join-Path $extPacote 'background.js') -Algorithm SHA256).Hash
    $arqAntigo = Join-Path $extInstalada 'background.js'
    $hashAntigo = if (Test-Path $arqAntigo) { (Get-FileHash $arqAntigo -Algorithm SHA256).Hash } else { '' }
    if ($hashNovo -ne $hashAntigo) {
        Write-Host '==> Renovando a extensao do Chrome...' -ForegroundColor Cyan
        Copy-Item -Path (Join-Path $extPacote '*') -Destination $extInstalada -Recurse -Force
        New-Item -ItemType Directory -Force -Path (Join-Path $raiz 'estado') | Out-Null
        Set-Content -Path (Join-Path $raiz 'estado\extensao-atualizada.txt') -Value (Get-Date -Format 's')
        $extensaoMudou = $true
    }
}

Remove-Item $tmp -Recurse -Force
Remove-Item $zip -Force
Write-Host '[OK] Programa atualizado. O estado (anuncios publicados, grupos, aprendizados) foi mantido.' -ForegroundColor Green
if ($extensaoMudou) {
    Write-Host '[ATENCAO] A extensao do Chrome foi atualizada. FECHE O GOOGLE CHROME POR COMPLETO (todas as janelas)' -ForegroundColor Yellow
    Write-Host '          e abra de novo antes de usar o programa, senao a versao antiga continua valendo.' -ForegroundColor Yellow
}
if (-not $SemPausa) { Read-Host 'Pressione ENTER para fechar' }
