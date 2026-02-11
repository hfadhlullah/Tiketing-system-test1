# Fix RFC 2119 keywords - convert "must" to "MUST" and "shall" to "SHALL" in requirement descriptions

$specFiles = Get-ChildItem -Path "prompter\changes\establish-baseline-specs\specs" -Filter "spec.md" -Recurse

foreach ($file in $specFiles) {
    Write-Host "Processing: $($file.FullName)"
    
    $content = Get-Content -Path $file.FullName -Raw
    $originalContent = $content
    
    # Pattern: Find requirement descriptions (first paragraph after ### Requirement:)
    # and replace lowercase "must" with "MUST", "shall" with "SHALL"
    
    # Regex to find requirement text blocks
    $pattern = '(### Requirement: [^\r\n]+\r?\n\r?\n)([^\r\n*#]+)'
    
    $newContent = $content -replace $pattern, {
        param($match)
        $header = $match.Groups[1].Value
        $description = $match.Groups[2].Value
        
        # Replace \\bmust\\b with MUST and \\bshall\\b with SHALL (word boundary)
        $description = $description -replace '\bmust\b', 'MUST'
        $description = $description -replace '\bshall\b', 'SHALL'
        $description = $description -replace '\bMust\b', 'MUST'
        $description = $description -replace '\bShall\b', 'SHALL'
        
        $header + $description
    }
    
    if ($originalContent -ne $newContent) {
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        Write-Host "  Fixed" -ForegroundColor Green
    } else {
        Write-Host "  - No changes" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "Done! Run: prompter validate establish-baseline-specs --strict" -ForegroundColor Cyan
