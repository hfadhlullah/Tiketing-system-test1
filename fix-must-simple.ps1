# Simple fix: Replace "must" and "shall" with uppercase in spec files

$specFiles = Get-ChildItem -Path "prompter\changes\establish-baseline-specs\specs" -Filter "spec.md" -Recurse

foreach ($file in $specFiles) {
    Write-Host "Processing: $($file.Name)"
    
    $lines = Get-Content -Path $file.FullName
    $newLines = @()
    $inRequirementDesc = $false
    $linesSinceReq = 0
    
    foreach ($line in $lines) {
        # Detect start of requirement
        if ($line -match '^### Requirement:') {
            $inRequirementDesc = $true
            $linesSinceReq = 0
            $newLines += $line
            continue
        }
        
        # Count lines after requirement header
        if ($inRequirementDesc) {
            $linesSinceReq++
            
            # First non-empty line after requirement header is the description
            if ($linesSinceReq -eq 2 -and $line.Trim() -ne '') {
                # This is the description line - fix must/shall
                $line = $line -replace '\bmust\b', 'MUST'
                $line = $line -replace '\bshall\b', 'SHALL'
                $line = $line -replace '\bMust\b', 'MUST'
                $line = $line -replace '\bShall\b', 'SHALL'
                $inRequirementDesc = $false
            }
        }
        
        $newLines += $line
    }
    
    Set-Content -Path $file.FullName -Value $newLines
    Write-Host "  Fixed" -ForegroundColor Green
}

Write-Host ""
Write-Host "Run: prompter validate establish-baseline-specs --strict" -ForegroundColor Cyan
