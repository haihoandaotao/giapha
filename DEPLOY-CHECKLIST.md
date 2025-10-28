# ✅ Checklist Deploy lên Render (PostgreSQL)

## 📋 Pre-deployment

- [x] Convert models: User, Family, Person → Sequelize
- [x] Convert controllers: auth, family, person → Sequelize  
- [x] Update config: database.js với PostgreSQL
- [x] Update dependencies: sequelize, pg, pg-hstore
- [x] Update .env: DATABASE_URL thay MONGODB_URI
- [x] Update render.yaml: PostgreSQL database config
- [x] Create test script: npm test
- [ ] Test local (nếu có PostgreSQL)
- [ ] Review code một lần nữa

## 🔧 GitHub Setup

- [ ] Tạo repository mới trên GitHub (nếu chưa có)
  ```
  Tên: giapha
  Description: Hệ thống quản lý gia phả - Family Tree Management
  Public/Private: Tùy chọn
  ```

- [ ] Initialize Git và push code
  ```powershell
  cd d:\Project\giapha
  git init
  git add .
  git commit -m "Initial commit - PostgreSQL version"
  git branch -M main
  git remote add origin https://github.com/<username>/giapha.git
  git push -u origin main
  ```

## 🗄️ Render Database Setup

- [ ] Đăng nhập Render: https://dashboard.render.com
- [ ] Create New PostgreSQL
  - Name: `giapha-db`
  - Database: `giapha`
  - User: `giapha_user` (hoặc để mặc định)
  - Region: **Singapore** (gần VN nhất)
  - Plan: **Free**

- [ ] Đợi database được tạo (1-2 phút)
- [ ] Copy **Internal Database URL** (dạng: `postgresql://...`)

## 🚀 Render Web Service Setup

- [ ] Create New Web Service
  - Connect to GitHub repository: `giapha`
  - Name: `giapha-app` (hoặc tên khác)
  - Region: **Singapore** (cùng với database)
  - Branch: `main`
  - Root Directory: `backend`
  - Environment: **Node**
  - Build Command: `npm install && npm run build`
  - Start Command: `npm start`
  - Plan: **Free**

- [ ] Configure Environment Variables:
  ```
  NODE_ENV=production
  PORT=10000
  DATABASE_URL=<paste_internal_database_url_from_step_above>
  JWT_SECRET=<generate_secure_random_string_here>
  JWT_EXPIRE=30d
  CORS_ORIGIN=*
  ```

  **Tạo JWT_SECRET**: Mở PowerShell chạy:
  ```powershell
  -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
  ```

- [ ] Save và Deploy

## 🔍 Verify Deployment

- [ ] Check Build Logs - phải thấy:
  ```
  ✓ npm install successful
  ✓ npm run build successful  
  ✓ Frontend build completed
  ```

- [ ] Check Deploy Logs - phải thấy:
  ```
  ✓ PostgreSQL connection successful
  ✓ Models synced
  ✓ Server running on port 10000
  ```

- [ ] Test Health Endpoint:
  ```
  https://giapha-app.onrender.com/api/health
  ```
  Phải trả về: `{"status": "ok"}`

- [ ] Test API:
  ```
  https://giapha-app.onrender.com/api/auth/register
  Method: POST
  Body: {
    "fullName": "Test User",
    "email": "test@example.com", 
    "password": "123456"
  }
  ```

## 🎨 Frontend Access

- [ ] Truy cập app:
  ```
  https://giapha-app.onrender.com
  ```

- [ ] Test các chức năng:
  - [ ] Đăng ký tài khoản mới
  - [ ] Đăng nhập
  - [ ] Tạo gia đình mới
  - [ ] Thêm thành viên
  - [ ] Xem cây gia phả
  - [ ] Tìm kiếm
  - [ ] Cập nhật profile

## 🐛 Troubleshooting

### Nếu build fail:
- [ ] Check Node version (phải >= 14)
- [ ] Check package.json syntax
- [ ] Review build logs để tìm error

### Nếu deploy fail:
- [ ] Check DATABASE_URL có đúng không
- [ ] Check JWT_SECRET đã set chưa
- [ ] Review deploy logs

### Nếu database connection fail:
- [ ] Verify Database và Web Service cùng region
- [ ] Check Internal Database URL (không phải External URL)
- [ ] Restart web service

### Nếu app chậm/sleep:
- [ ] Đây là normal với Free tier
- [ ] App sẽ sleep sau 15 phút không dùng
- [ ] Lần đầu truy cập sau khi sleep sẽ mất 30-60s để wake up

## 📝 Post-deployment

- [ ] Lưu credentials:
  - Database URL
  - Web Service URL
  - GitHub repository URL
  - Admin account credentials

- [ ] Update README.md với:
  - Live demo URL
  - Test credentials (nếu có)
  - Screenshots

- [ ] Share với team/friends! 🎉

## 🔄 Auto-deploy

Sau khi setup xong, mỗi lần push code lên GitHub:
```powershell
git add .
git commit -m "Your changes"
git push
```

Render sẽ **tự động** rebuild và deploy! 🚀

## 💡 Tips

1. **Free tier limitations**:
   - Database: 1GB storage, auto-delete sau 90 ngày không dùng
   - Web service: Sleep sau 15 phút idle
   - Băng thông: 100GB/tháng

2. **Keep app awake**:
   - Dùng UptimeRobot hoặc Cron-job.org ping mỗi 10 phút
   - Hoặc upgrade lên paid plan ($7/tháng)

3. **Backup data**:
   - Export PostgreSQL data định kỳ
   - Hoặc dùng Render snapshots (paid feature)

4. **Monitor**:
   - Check Render dashboard thường xuyên
   - Xem metrics, logs để debug

## 🎯 Alternative Options

Nếu không thích Render, có thể thử:

1. **Railway** (https://railway.app)
   - $5 credit/tháng free
   - PostgreSQL included
   - Deploy dễ hơn

2. **Vercel** (frontend) + **Supabase** (backend + DB)
   - Vercel: Free unlimited cho frontend
   - Supabase: PostgreSQL + Auth + Storage free

3. **Netlify** (frontend) + **Railway/Render** (backend)

Good luck! 🍀 Mọi thắc mắc cứ hỏi nhé!
