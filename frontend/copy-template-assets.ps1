# PowerShell script to copy template assets to frontend public directory
# This script creates a symbolic link or copies assets from template to frontend

$TemplateAssets = "..\template\assets"
$TargetPublic = ".\public\assets"

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  DIOS Template Assets Sync Script" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Check if template assets exist
if (-not (Test-Path $TemplateAssets)) {
    Write-Host "Error: Template assets not found at $TemplateAssets" -ForegroundColor Red
    exit 1
}

Write-Host "Template assets found" -ForegroundColor Green

# Remove existing assets if they exist
if (Test-Path $TargetPublic) {
    Write-Host "Removing existing assets..." -ForegroundColor Yellow
    Remove-Item -Path $TargetPublic -Recurse -Force
}

# Create public directory if it doesn't exist
if (-not (Test-Path ".\public")) {
    New-Item -ItemType Directory -Path ".\public" | Out-Null
}

# Try to create symbolic link (requires admin privileges)
Write-Host "Attempting to create symbolic link..." -ForegroundColor Cyan

try {
    # Get absolute paths
    $SourcePath = Resolve-Path $TemplateAssets
    $TargetPath = Join-Path (Get-Location) $TargetPublic
    
    # Create symbolic link
    New-Item -ItemType SymbolicLink -Path $TargetPath -Target $SourcePath -ErrorAction Stop | Out-Null
    Write-Host "Symbolic link created successfully!" -ForegroundColor Green
    Write-Host "  Source: $SourcePath" -ForegroundColor Gray
    Write-Host "  Target: $TargetPath" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Assets are now linked and will auto-update when template changes!" -ForegroundColor Green
} catch {
    # If symbolic link fails (no admin rights), copy files instead
    Write-Host "Symbolic link failed (requires admin privileges)" -ForegroundColor Yellow
    Write-Host "Copying assets instead..." -ForegroundColor Cyan
    
    Copy-Item -Path $TemplateAssets -Destination $TargetPublic -Recurse -Force
    Write-Host "Assets copied successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Note: Changes to template assets will require re-running this script" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Run 'npm install' if you haven't already"
Write-Host "  2. Run 'npm run dev' to start the development server"
Write-Host ""
