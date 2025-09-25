# Simple HTTP Server for Hot-Pot World
# This script starts a local web server for testing

Write-Host "Starting Hot-Pot World Local Server..." -ForegroundColor Green
Write-Host "Server will be available at: http://localhost:8080" -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Cyan
Write-Host ""

# Check if Python is available
try {
    python --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Using Python HTTP server..." -ForegroundColor Green
        python -m http.server 8080
    }
} catch {
    # If Python is not available, try using PowerShell's built-in web server
    Write-Host "Python not found, using PowerShell web server..." -ForegroundColor Yellow
    
    # Create a simple web server using PowerShell
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:8080/")
    $listener.Start()
    
    Write-Host "Server started at http://localhost:8080" -ForegroundColor Green
    Write-Host "Press Ctrl+C to stop" -ForegroundColor Cyan
    
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $localPath = $request.Url.LocalPath
        if ($localPath -eq "/") { $localPath = "/index.html" }
        
        $filePath = Join-Path $PWD $localPath.TrimStart('/')
        
        if (Test-Path $filePath) {
            $content = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
        } else {
            $response.StatusCode = 404
            $notFound = [System.Text.Encoding]::UTF8.GetBytes("404 - File Not Found")
            $response.OutputStream.Write($notFound, 0, $notFound.Length)
        }
        
        $response.Close()
    }
}
