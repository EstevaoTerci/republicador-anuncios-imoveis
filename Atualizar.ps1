# Atualiza os arquivos do programa a partir do repositorio, SEM mexer na pasta "estado"
# (publicados, grupos, config, aprendizados, logs) nem nas fotos ja baixadas.
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

Write-Host '==> Copiando arquivos (preservando estado e fotos)...' -ForegroundColor Cyan
foreach ($p in $preservar) {
    $dir = Join-Path $origem $p
    if (Test-Path $dir) { Remove-Item $dir -Recurse -Force }
}
Copy-Item -Path (Join-Path $origem '*') -Destination $raiz -Recurse -Force

# Arquivos de estado que nao existem ainda (instalacao antiga) ganham o modelo do repositorio
$modelos = @('estado\config.json', 'estado\grupos.json', 'estado\publicados.json')
Expand-Archive -Path $zip -DestinationPath $tmp -Force
foreach ($m in $modelos) {
    $dest = Join-Path $raiz $m
    $src = Join-Path $origem $m
    if (-not (Test-Path $dest) -and (Test-Path $src)) {
        New-Item -ItemType Directory -Force -Path (Split-Path -Parent $dest) | Out-Null
        Copy-Item $src $dest
        Write-Host "    criado: $m"
    }
}

Remove-Item $tmp -Recurse -Force
Remove-Item $zip -Force
Write-Host '[OK] Programa atualizado. O estado (anuncios publicados, grupos, aprendizados) foi mantido.' -ForegroundColor Green
if (-not $SemPausa) { Read-Host 'Pressione ENTER para fechar' }
