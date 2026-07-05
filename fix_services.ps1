$servicesDir = "src\app\components\services"
$files = Get-ChildItem "$servicesDir\*.tsx"

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Fix hero section: reduce top padding on mobile
    $content = $content -replace 'pt-32 pb-20 lg:pt-40 lg:pb-28', 'pt-20 pb-16 sm:pt-28 sm:pb-20 lg:pt-40 lg:pb-28'
    
    # Fix section vertical padding
    $content = $content -replace 'className="py-20 lg:py-28"', 'className="py-14 sm:py-20 lg:py-28"'
    $content = $content -replace 'className="py-20 bg-muted"', 'className="py-14 sm:py-20 bg-muted"'
    $content = $content -replace 'className="py-20 bg-card"', 'className="py-14 sm:py-20 bg-card"'
    $content = $content -replace 'className="py-20 bg-primary"', 'className="py-14 sm:py-20 bg-primary"'
    $content = $content -replace 'className="py-20"', 'className="py-14 sm:py-20"'
    
    # Fix horizontal padding + grid columns for overview layouts
    $content = $content -replace 'mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16', 'mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16'
    
    # Fix section px-6 to responsive
    $content = $content -replace 'mx-auto px-6\b', 'mx-auto px-4 sm:px-6'
    
    # Fix image heights on mobile
    $content = $content -replace 'className="rounded-2xl shadow-2xl object-cover w-full h-\[600px\]"', 'className="rounded-2xl shadow-2xl object-cover w-full h-[350px] sm:h-[500px] lg:h-[600px]"'
    $content = $content -replace 'className="rounded-xl shadow-2xl object-cover w-full h-\[600px\]"', 'className="rounded-xl shadow-2xl object-cover w-full h-[350px] sm:h-[500px] lg:h-[600px]"'
    
    # Fix button min-height
    $content = $content -replace 'className="bg-accent text-primary font-black px-8 py-4 rounded hover:bg-yellow-400 transition-colors inline-flex items-center gap-2"', 'className="bg-accent text-primary font-black px-6 sm:px-8 py-3.5 sm:py-4 rounded hover:bg-yellow-400 transition-colors inline-flex items-center gap-2 min-h-0"'
    
    Set-Content -Path $file.FullName -Value $content -NoNewline -Encoding UTF8
    Write-Host "Updated: $($file.Name)"
}

Write-Host "All service pages updated."
