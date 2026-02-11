# Clean up corrupted PowerShell scriptblock text from spec files

$specFiles = Get-ChildItem -Path "prompter\changes\establish-baseline-specs\specs" -Filter "spec.md" -Recurse

foreach ($file in $specFiles) {
    Write-Host "Processing: $($file.Name)"
    
    $lines = Get-Content -Path $file.FullName
    $cleanLines = @()
    
    foreach ($line in $lines) {
        $trimmed = $line.Trim()
        
        # Skip lines that are PowerShell code (corruption)
        if ($trimmed -match 'param\(\$match\)' -or 
            $trimmed -match '^\$header' -or 
            $trimmed -match '^\$description' -or
            $trimmed -match '^# Replace' -or
            $trimmed -match 'replace.*\\b(must|shall)\\b' -or
            $trimmed -eq '}' -or
            $trimmed -eq '{') {
            continue  # Skip PS code lines
        }
        
        $cleanLines += $line
    }
    
    Set-Content -Path $file.FullName -Value $cleanLines
    Write-Host "  Cleaned" -ForegroundColor Green
}

Write-Host ""
Write-Host "Removed PowerShell corruption. Now need to reconstruct requirement headers." -ForegroundColor Yellow
