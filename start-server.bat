@echo off
echo Starting local server for Hot-Pot World website...
echo.
echo This will allow the menu to load dynamically from the CSV file.
echo.
echo Server will be available at: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server when you're done.
echo.

REM Try different methods to start a local server
echo Trying to start server...

REM Try Node.js http-server if available
where node >nul 2>nul
if %errorlevel% == 0 (
    echo Node.js found, starting http-server...
    echo Opening website in browser...
    start http://localhost:8000/index.html
    npx http-server -p 8000 --cors
    goto :end
)

REM Try Python if available
where python >nul 2>nul
if %errorlevel% == 0 (
    echo Python found, starting server...
    echo Opening website in browser...
    start http://localhost:8000/index.html
    python -m http.server 8000
    goto :end
)

REM Try Python3 if available
where python3 >nul 2>nul
if %errorlevel% == 0 (
    echo Python3 found, starting server...
    echo Opening website in browser...
    start http://localhost:8000/index.html
    python3 -m http.server 8000
    goto :end
)

REM If nothing works, show instructions
echo.
echo No suitable server found. Please install one of the following:
echo.
echo Option 1 - Install Node.js:
echo   1. Go to https://nodejs.org/
echo   2. Download and install Node.js
echo   3. Run this batch file again
echo.
echo Option 2 - Install Python:
echo   1. Go to https://python.org/
echo   2. Download and install Python
echo   3. Run this batch file again
echo.
echo Option 3 - Use VS Code Live Server:
echo   1. Install "Live Server" extension in VS Code
echo   2. Right-click on index.html
echo   3. Select "Open with Live Server"
echo.
pause

:end
