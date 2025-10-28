# Pre-deployment Checklist Script
# Kiểm tra dự án trước khi deploy

Write-Host "🔍 PRE-DEPLOYMENT CHECKLIST" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

$allGood = $true

# 1. Kiểm tra cấu trúc thư mục
Write-Host "1. Kiểm tra cấu trúc thư mục..." -ForegroundColor Yellow

if (Test-Path "backend/server.js") {
    Write-Host "   ✅ backend/server.js exists" -ForegroundColor Green
} else {
    Write-Host "   ❌ backend/server.js NOT found" -ForegroundColor Red
    $allGood = $false
}

if (Test-Path "frontend/package.json") {
    Write-Host "   ✅ frontend/package.json exists" -ForegroundColor Green
} else {
    Write-Host "   ❌ frontend/package.json NOT found" -ForegroundColor Red
    $allGood = $false
}

Write-Host ""

# 2. Kiểm tra .gitignore
Write-Host "2. Kiểm tra .gitignore..." -ForegroundColor Yellow

if (Test-Path ".gitignore") {
    $gitignoreContent = Get-Content ".gitignore" -Raw
    
    if ($gitignoreContent -match "node_modules") {
        Write-Host "   ✅ node_modules ignored" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  node_modules NOT in .gitignore" -ForegroundColor Yellow
    }
    
    if ($gitignoreContent -match "\.env") {
        Write-Host "   ✅ .env files ignored" -ForegroundColor Green
    } else {
        Write-Host "   ❌ .env NOT in .gitignore - SECURITY RISK!" -ForegroundColor Red
        $allGood = $false
    }
} else {
    Write-Host "   ❌ .gitignore NOT found" -ForegroundColor Red
    $allGood = $false
}

Write-Host ""

# 3. Kiểm tra file .env không được commit
Write-Host "3. Kiểm tra bảo mật..." -ForegroundColor Yellow

if (Test-Path "backend/.env") {
    Write-Host "   ⚠️  backend/.env exists (OK nếu chỉ development)" -ForegroundColor Yellow
    Write-Host "   ⚠️  Đảm bảo .env đã được ignore trong Git!" -ForegroundColor Yellow
} else {
    Write-Host "   ℹ️  backend/.env không tồn tại (sẽ dùng env vars trên Render)" -ForegroundColor Cyan
}

if (Test-Path "backend/.env.example") {
    Write-Host "   ✅ backend/.env.example exists" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  backend/.env.example NOT found" -ForegroundColor Yellow
}

Write-Host ""

# 4. Kiểm tra node_modules
Write-Host "4. Kiểm tra dependencies..." -ForegroundColor Yellow

if (Test-Path "backend/node_modules") {
    Write-Host "   OK - backend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "   WARNING - backend/node_modules NOT found" -ForegroundColor Yellow
    Write-Host "   Run: cd backend; npm install" -ForegroundColor Cyan
}

if (Test-Path "frontend/node_modules") {
    Write-Host "   OK - frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "   WARNING - frontend/node_modules NOT found" -ForegroundColor Yellow
    Write-Host "   Run: cd frontend; npm install" -ForegroundColor Cyan
}

Write-Host ""

# 5. Kiểm tra package.json scripts
Write-Host "5. Kiểm tra build scripts..." -ForegroundColor Yellow

$backendPkg = Get-Content "backend/package.json" -Raw | ConvertFrom-Json

if ($backendPkg.scripts.start) {
    Write-Host "   ✅ backend has 'start' script" -ForegroundColor Green
} else {
    Write-Host "   ❌ backend missing 'start' script" -ForegroundColor Red
    $allGood = $false
}

if ($backendPkg.scripts.build) {
    Write-Host "   ✅ backend has 'build' script" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  backend missing 'build' script" -ForegroundColor Yellow
}

Write-Host ""

# 6. Kiểm tra file quan trọng
Write-Host "6. Kiểm tra file documentation..." -ForegroundColor Yellow

$requiredFiles = @(
    "README.md",
    "DEPLOYMENT.md",
    "GITHUB.md",
    "render.yaml"
)

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "   ✅ $file exists" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  $file NOT found" -ForegroundColor Yellow
    }
}

Write-Host ""

# 7. Kiểm tra Git
Write-Host "7. Kiểm tra Git..." -ForegroundColor Yellow

try {
    $gitStatus = git status 2>&1
    
    if ($gitStatus -match "Not a git repository") {
        Write-Host "   ⚠️  Chưa khởi tạo Git repository" -ForegroundColor Yellow
        Write-Host "   ℹ️  Run: git init" -ForegroundColor Cyan
    } else {
        Write-Host "   ✅ Git repository initialized" -ForegroundColor Green
        
        $hasRemote = git remote -v 2>$null
        if ($hasRemote) {
            Write-Host "   ✅ Git remote configured" -ForegroundColor Green
        } else {
            Write-Host "   ⚠️  Git remote NOT configured" -ForegroundColor Yellow
            Write-Host "   ℹ️  Run: git remote add origin https://github.com/USERNAME/giapha.git" -ForegroundColor Cyan
        }
    }
} catch {
    Write-Host "   ❌ Git NOT installed" -ForegroundColor Red
    Write-Host "   ℹ️  Download: https://git-scm.com/download/win" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan

if ($allGood) {
    Write-Host "ALL CHECKS PASSED!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next Steps:" -ForegroundColor Cyan
    Write-Host "   1. Dam bao MongoDB Atlas da setup" -ForegroundColor White
    Write-Host "   2. Tao repository tren GitHub" -ForegroundColor White
    Write-Host "   3. Run: .\deploy-github.ps1" -ForegroundColor White
    Write-Host "   4. Deploy len Render theo DEPLOYMENT.md" -ForegroundColor White
} else {
    Write-Host "SOME ISSUES FOUND!" -ForegroundColor Yellow
    Write-Host "   Please fix the issues above before deploying" -ForegroundColor Yellow
}

Write-Host ""
