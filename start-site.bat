@echo off
echo ========================================
echo Lancement du site React
echo ========================================
echo.
echo Acces au dossier du projet...
cd /d "%~dp0"
echo Dossier actuel: %CD%
echo.
echo Installation des dependances si necessaire...
npm install
echo.
echo Lancement du serveur de developpement...
npm run dev
pause 