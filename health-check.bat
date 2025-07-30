@echo off
echo ========================================
echo Verification de sante du projet
echo ========================================
echo.

echo 1. Verification de Node.js...
node --version
if %errorlevel% neq 0 (
    echo ERREUR: Node.js n'est pas installe ou pas dans le PATH
    pause
    exit /b 1
)

echo.
echo 2. Verification de npm...
npm --version
if %errorlevel% neq 0 (
    echo ERREUR: npm n'est pas installe
    pause
    exit /b 1
)

echo.
echo 3. Verification du package.json...
if not exist "package.json" (
    echo ERREUR: package.json manquant
    pause
    exit /b 1
)

echo.
echo 4. Verification des dependances...
if not exist "node_modules" (
    echo ATTENTION: node_modules manquant, installation en cours...
    npm install
)

echo.
echo 5. Verification des fichiers essentiels...
if not exist "src\App.tsx" (
    echo ERREUR: src\App.tsx manquant
    pause
    exit /b 1
)

if not exist "src\main.tsx" (
    echo ERREUR: src\main.tsx manquant
    pause
    exit /b 1
)

echo.
echo 6. Test de compilation...
echo Test de build en cours...
npm run build >nul 2>&1
if %errorlevel% neq 0 (
    echo ERREUR: Probleme de compilation detecte
    echo Lancement du build avec details...
    npm run build
    pause
    exit /b 1
)

echo.
echo ========================================
echo Verification terminee avec succes !
echo ========================================
echo.
echo Le projet est pret pour le developpement.
echo.
pause 