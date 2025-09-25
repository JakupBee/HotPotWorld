@echo off
echo Starting Hot-Pot World Local Server...
echo Server will be available at: http://localhost:8080
echo Press Ctrl+C to stop the server
echo.

REM Try to use Python if available
python -m http.server 8080 2>nul
if %errorlevel% neq 0 (
    echo Python not found, trying PowerShell...
    powershell -ExecutionPolicy Bypass -File start-server.ps1
)

pause
