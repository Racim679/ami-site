@echo off
echo ========================================
echo Nettoyage du projet
echo ========================================
echo.

echo Suppression des fichiers temporaires...
if exist "node_modules\.cache" rmdir /s /q "node_modules\.cache"
if exist ".vite" rmdir /s /q ".vite"
if exist "dist" rmdir /s /q "dist"

echo.
echo Nettoyage du cache npm...
npm cache clean --force

echo.
echo Reinstallation des dependances...
npm install

echo.
echo Nettoyage termine !
echo.
pause 