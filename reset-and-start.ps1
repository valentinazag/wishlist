#!/usr/bin/env pwsh
# Script para resetear Docker y levantar todos los servicios

Write-Host "🔄 Deteniendo contenedores..." -ForegroundColor Yellow
docker compose down 2>$null
docker compose -f docker-compose.catalog.yml down 2>$null
docker compose -f external-service/docker-compose.yml down 2>$null

Write-Host "🗑️  Eliminando contenedores..." -ForegroundColor Yellow
$containers = docker ps -aq
if ($containers) {
    docker rm -f $containers
}

Write-Host "🗑️  Eliminando volúmenes..." -ForegroundColor Yellow
$volumes = docker volume ls -q
if ($volumes) {
    docker volume rm $volumes 2>$null
}

Write-Host "🧹 Limpiando sistema Docker..." -ForegroundColor Yellow
docker system prune -af

Write-Host "🚀 Levantando base de datos..." -ForegroundColor Green
docker compose up -d

Write-Host "⏳ Esperando a que PostgreSQL esté listo..." -ForegroundColor Cyan
Start-Sleep -Seconds 5

Write-Host "🚀 Levantando servicio externo..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "docker compose -f external-service/docker-compose.yml up"

Write-Host "⏳ Esperando a que el servicio externo esté listo..." -ForegroundColor Cyan
Start-Sleep -Seconds 3

Write-Host "✅ Contenedores activos:" -ForegroundColor Green
docker ps

Write-Host "`n� Verificando puerto 3000..." -ForegroundColor Cyan
$port3000 = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($port3000) {
    Write-Host "⚠️  Puerto 3000 en uso, liberando..." -ForegroundColor Yellow
    Stop-Process -Id $port3000.OwningProcess -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 2
}

Write-Host "`n�🚀 Iniciando aplicación NestJS..." -ForegroundColor Green
npm run start:dev
