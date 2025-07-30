@echo off
echo ========================================
echo Lancement de n8n avec CORS configure
echo ========================================
echo.
echo Configuration CORS pour localhost:8081...
set N8N_ENDPOINT_WEBHOOK_CORS_ALLOW_ORIGIN=http://localhost:8081
echo Variable d'environnement definie: %N8N_ENDPOINT_WEBHOOK_CORS_ALLOW_ORIGIN%
echo.
echo Lancement de n8n...
echo.
n8n
pause 