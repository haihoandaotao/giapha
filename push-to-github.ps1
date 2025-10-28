# Script tự động push code lên GitHub
# Chạy: .\push-to-github.ps1 <your-github-username>

param(
    [Parameter(Mandatory=$true)]
    [string]$GithubUsername
)

Write-Host "================================" -ForegroundColor Cyan
Write-Host " PUSH CODE LÊN GITHUB" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

$repoUrl = "https://github.com/$GithubUsername/giapha.git"

Write-Host "📦 Repository URL: $repoUrl" -ForegroundColor Yellow
Write-Host ""

# Kiểm tra xem đã có remote chưa
$hasRemote = git remote | Select-String "origin"

if ($hasRemote) {
    Write-Host "⚠️  Remote 'origin' đã tồn tại. Đang xóa..." -ForegroundColor Yellow
    git remote remove origin
}

Write-Host "🔗 Đang thêm remote origin..." -ForegroundColor Green
git remote add origin $repoUrl

Write-Host ""
Write-Host "📤 Đang push code lên GitHub..." -ForegroundColor Green
Write-Host ""

# Push code
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "================================" -ForegroundColor Green
    Write-Host " ✅ PUSH THÀNH CÔNG!" -ForegroundColor Green
    Write-Host "================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 Xem code tại: https://github.com/$GithubUsername/giapha" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "🚀 Tiếp theo: Đọc file DEPLOY-CHECKLIST.md để deploy lên Render!" -ForegroundColor Yellow
} else {
    Write-Host ""
    Write-Host "================================" -ForegroundColor Red
    Write-Host " ❌ PUSH THẤT BẠI!" -ForegroundColor Red
    Write-Host "================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Các giải pháp:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Nếu chưa tạo repository trên GitHub:" -ForegroundColor White
    Write-Host "   - Vào https://github.com/new" -ForegroundColor Gray
    Write-Host "   - Tạo repo tên 'giapha'" -ForegroundColor Gray
    Write-Host "   - Không tick 'Initialize with README'" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Nếu bị hỏi username/password:" -ForegroundColor White
    Write-Host "   - Username: $GithubUsername" -ForegroundColor Gray
    Write-Host "   - Password: Dùng Personal Access Token (không phải password thật)" -ForegroundColor Gray
    Write-Host "   - Tạo token tại: https://github.com/settings/tokens" -ForegroundColor Gray
    Write-Host ""
    Write-Host "3. Nếu lỗi khác:" -ForegroundColor White
    Write-Host "   - Chụp ảnh màn hình lỗi và hỏi lại!" -ForegroundColor Gray
    Write-Host ""
}
