$ErrorActionPreference = "Stop"
$root = (Get-Location).Path
$out = Join-Path $root "AI-Handoff-Export"

New-Item -ItemType Directory -Path $out -Force | Out-Null
$report = Join-Path $out "project-report.md"

"# CareFirst Backend - AI Handover Report" |
    Set-Content $report -Encoding utf8

Add-Content $report "`n## Project tree`n"
Get-ChildItem ".\src" -Recurse -File -ErrorAction SilentlyContinue |
    ForEach-Object {
        Add-Content $report ($_.FullName.Substring($root.Length + 1))
    }

Add-Content $report "`n## Git status`n"
git status --short --branch 2>&1 | Out-String |
    Add-Content $report

Add-Content $report "`n## Recent commits`n"
git log -5 --oneline 2>&1 | Out-String |
    Add-Content $report

$files = @()
$files += Get-Item ".\pom.xml"

foreach ($folder in @(
    ".\src\main\java",
    ".\src\test",
    ".\src\main\resources\db\migration"
)) {
    if (Test-Path $folder) {
        $files += Get-ChildItem $folder -Recurse -File
    }
}

$files += Get-ChildItem "." -File |
    Where-Object {
        $_.Extension -eq ".md" -or
        $_.Name -in @("README", "README.md", ".gitignore", "AGENTS.md", "CLAUDE.md")
    }

$files = $files | Sort-Object FullName -Unique

Add-Content $report "`n## Source files and documentation`n"

foreach ($file in $files) {
    $relative = $file.FullName.Substring($root.Length + 1)
    Add-Content $report "`n### FILE: $relative`n"
    Add-Content $report '```'

    $content = Get-Content $file.FullName -Raw

    # Basic redaction of likely secret assignments.
    $content = [regex]::Replace(
        $content,
        '(?im)^(\s*[^#\r\n]*(?:password|passwd|secret|token|api[_-]?key|client[_-]?secret|access[_-]?key|private[_-]?key|credential)[^=:\r\n]*[=:]\s*).+$',
        '$1[REDACTED]'
    )

    Add-Content $report $content
    Add-Content $report '```'
}

$zip = Join-Path $root "AI-Handoff-Export.zip"
Compress-Archive -Path (Join-Path $out "*") -DestinationPath $zip -Force

Write-Host "`nSUCCESS! Export created:"
Write-Host $report
Write-Host $zip
