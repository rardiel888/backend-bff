@echo off
title Auto Push Backend to GitHub
echo ================================================
echo  🚀 Iniciando autoguardado y subida a GitHub (Backend)...
echo ================================================
:loop
cd /d "C:\Users\Rardiel Ceballo\Desktop\Taller Info-base de datos\backend-bff"
git add .
git commit -m "Auto update backend"
git push origin main
echo 🔄 Cambios del backend subidos. Esperando 10 segundos...
timeout /t 10 >nul
goto loop
