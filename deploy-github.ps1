# Script tự động push code lên GitHub
# Sử dụng: .\deploy-github.ps1

Write-Host "🚀 GitHub Deployment Script" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Kiểm tra Git đã cài chưa
try {
    $gitVersion = git --version
    Write-Host "✅ Git đã được cài đặt: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git chưa được cài đặt!" -ForegroundColor Red
    Write-Host "Vui lòng tải Git tại: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Kiểm tra đã có remote chưa
$hasRemote = git remote -v 2>$null

if (-not $hasRemote) {
    Write-Host "📝 Cấu hình GitHub repository lần đầu" -ForegroundColor Yellow
    Write-Host ""
    
    $username = Read-Host "Nhập GitHub username của bạn"
    
    Write-Host ""
    Write-Host "Đang khởi tạo Git repository..." -ForegroundColor Cyan
    git init
    
    Write-Host "Đang thêm remote origin..." -ForegroundColor Cyan
    git remote add origin "https://github.com/$username/giapha.git"
    
    Write-Host "Đang đổi branch thành main..." -ForegroundColor Cyan
    git branch -M main
    
    Write-Host ""
    Write-Host "⚠️  LƯU Ý QUAN TRỌNG:" -ForegroundColor Yellow
    Write-Host "1. Đảm bảo bạn đã tạo repository 'giapha' trên GitHub" -ForegroundColor Yellow
    Write-Host "2. Repository phải RỖNG (không có README, .gitignore)" -ForegroundColor Yellow
    Write-Host "3. Khi được hỏi password, dùng Personal Access Token" -ForegroundColor Yellow
    Write-Host ""
    
    $continue = Read-Host "Bạn đã tạo repository chưa? (y/n)"
    if ($continue -ne 'y') {
        Write-Host "❌ Hãy tạo repository trước rồi chạy lại script!" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "📦 Đang chuẩn bị commit..." -ForegroundColor Cyan

# Lấy commit message
$commitMsg = Read-Host "Nhập commit message (Enter để dùng mặc định)"
if ([string]::IsNullOrWhiteSpace($commitMsg)) {
    $commitMsg = "Update code - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
}

# Add tất cả files
Write-Host "Đang thêm files..." -ForegroundColor Cyan
git add .

# Hiển thị files sẽ commit
Write-Host ""
Write-Host "Files sẽ được commit:" -ForegroundColor Yellow
git status --short

Write-Host ""

# Commit
Write-Host "Đang commit..." -ForegroundColor Cyan
git commit -m "$commitMsg"

# Push
Write-Host ""
Write-Host "Đang push lên GitHub..." -ForegroundColor Cyan
Write-Host "⏳ Nếu được hỏi password, hãy dùng Personal Access Token" -ForegroundColor Yellow
Write-Host ""

try {
    git push -u origin main
    Write-Host ""
    Write-Host "✅ THÀNH CÔNG! Code đã được push lên GitHub" -ForegroundColor Green
    Write-Host ""
    Write-Host "🔗 Kiểm tra tại: https://github.com/$username/giapha" -ForegroundColor Cyan
} catch {
    Write-Host ""
    Write-Host "❌ Lỗi khi push!" -ForegroundColor Red
    Write-Host "Vui lòng kiểm tra:" -ForegroundColor Yellow
    Write-Host "1. Repository đã được tạo trên GitHub chưa?" -ForegroundColor Yellow
    Write-Host "2. Bạn đã dùng đúng Personal Access Token chưa?" -ForegroundColor Yellow
    Write-Host "3. Internet connection có ổn định không?" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "🎉 Hoàn thành!" -ForegroundColor Green
