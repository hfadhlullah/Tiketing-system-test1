# Fix spec files to use correct format for Prompter validation
# Pattern: Move **Description**: text to be first paragraph, keep *ID: XXX* at end

$specFiles = Get-ChildItem -Path "prompter\changes\establish-baseline-specs\specs" -Filter "spec.md" -Recurse

foreach ($file in $specFiles) {
    Write-Host "Processing: $($file.FullName)"
    
    $content = Get-Content -Path $file.FullName -Raw
    
    # Pattern to match:
    # ###  Requirement: Title
    # **ID**: REQ-001  
    # **Description**: The system must...
    #
    # And replace with:
    # ### Requirement: Title
    #
    # The system must...
    #
    # *ID: REQ-001*
    
    $pattern = '(### Requirement: [^\r\n]+)\r?\n\*\*ID\*\*:\s*([^\r\n]+)\s*\r?\n\*\*Description\*\*:\s*([^\r\n]+)'
    $replacement = '$1' + [Environment]::NewLine + [Environment]::NewLine + '$3' + [Environment]::NewLine + [Environment]::NewLine + '*ID: $2*'
    
    $newContent = $content -replace $pattern, $replacement
    
    # Also handle cases where there's a dangling description line before ID/Description block
    # Pattern: Lines with just description text before the **ID**: block
    $pattern2 = '([^\r\n]+)\r?\n\r?\n\*ID:\s*([^\r\n]+)\*\r?\n\*\*ID\*\*:\s*([^\r\n]+)\s*\r?\n\*\*Description\*\*:\s*([^\r\n]+)'
    $replacement2 = '### Requirement: $1' + [Environment]::NewLine + [Environment]::NewLine + '$4' + [Environment]::NewLine + [Environment]::NewLine + '*ID: $3*'
    
    $newContent = $newContent -replace $pattern2, $replacement2
    
    if ($content -ne $newContent) {
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        Write-Host "  Fixed" -ForegroundColor Green
    } else {
        Write-Host "  - No changes needed" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "Done! Run: prompter validate establish-baseline-specs --strict" -ForegroundColor Cyan
