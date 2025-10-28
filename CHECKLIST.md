# ✅ DEPLOYMENT CHECKLIST

Sử dụng checklist này trước khi deploy để đảm bảo không bỏ sót gì.

## 📋 Pre-Deployment (Trước Deploy)

### 1. Code Ready
- [ ] Tất cả features đã được test local
- [ ] Backend chạy OK tại http://localhost:5000
- [ ] Frontend chạy OK tại http://localhost:3000
- [ ] Không có lỗi trong console
- [ ] API endpoints hoạt động đúng

### 2. Dependencies
- [ ] `backend/node_modules` đã được cài
- [ ] `frontend/node_modules` đã được cài
- [ ] Không có vulnerability nghiêm trọng (chạy `npm audit`)

### 3. Files & Configuration
- [ ] File `.gitignore` đã tạo
- [ ] File `backend/.env.example` tồn tại
- [ ] File `backend/.env` KHÔNG được commit (check git status)
- [ ] File `render.yaml` đã tạo
- [ ] README.md đã cập nhật

### 4. Git Repository
- [ ] Git đã được khởi tạo (`git init`)
- [ ] Tất cả files cần thiết đã được add
- [ ] Đã commit với message rõ ràng
- [ ] Repository trên GitHub đã được tạo (public/private)

---

## 🗄️ Database Setup (MongoDB Atlas)

### 5. MongoDB Atlas
- [ ] Tài khoản MongoDB Atlas đã tạo
- [ ] Cluster đã được tạo (FREE tier, Singapore region)
- [ ] Database user đã được tạo
- [ ] Password đã được lưu lại an toàn
- [ ] Network Access: IP 0.0.0.0/0 đã được whitelist
- [ ] Connection string đã được copy
- [ ] Connection string đã test (có thể connect)

**Connection String Format:**
```
mongodb+srv://username:password@cluster-name.xxxxx.mongodb.net/giapha?retryWrites=true&w=majority
```

---

## 📤 GitHub Push

### 6. Push to GitHub
- [ ] Repository URL đã có: `https://github.com/USERNAME/giapha.git`
- [ ] Remote origin đã được thêm
- [ ] Code đã được push lên main branch
- [ ] Repository trên GitHub hiển thị đầy đủ code
- [ ] File `.env` KHÔNG xuất hiện trên GitHub

**Quick Check:**
```bash
git remote -v  # Kiểm tra remote
git log        # Kiểm tra commits
```

---

## 🚀 Render Deployment

### 7. Render Account
- [ ] Tài khoản Render đã tạo
- [ ] GitHub đã được connect với Render
- [ ] Repository `giapha` hiển thị trong Render

### 8. Web Service Configuration
- [ ] Service name: `giapha-app` (hoặc tên khác)
- [ ] Region: **Singapore**
- [ ] Branch: **main**
- [ ] Build Command: `cd backend && npm install && npm run build`
- [ ] Start Command: `cd backend && npm start`
- [ ] Instance Type: **Free**

### 9. Environment Variables
- [ ] `NODE_ENV` = `production`
- [ ] `PORT` = `10000`
- [ ] `MONGODB_URI` = (connection string from Atlas)
- [ ] `JWT_SECRET` = (random secure string, tối thiểu 32 ký tự)
- [ ] `JWT_EXPIRE` = `30d`
- [ ] `CORS_ORIGIN` = `https://your-app-name.onrender.com`

**Generate JWT_SECRET:**
```bash
# Option 1: Use PowerShell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})

# Option 2: Use online generator
# https://generate-secret.vercel.app/32
```

### 10. Deploy & Monitor
- [ ] Click "Create Web Service"
- [ ] Monitor build logs (5-10 phút)
- [ ] Build thành công (không có error)
- [ ] Service đang running (status: Live)
- [ ] Health check: `https://your-app.onrender.com/api/health` trả về OK

---

## ✅ Post-Deployment (Sau Deploy)

### 11. Testing Live App
- [ ] Truy cập `https://your-app.onrender.com`
- [ ] Trang Home hiển thị đúng
- [ ] Có thể đăng ký tài khoản mới
- [ ] Có thể đăng nhập
- [ ] API endpoints hoạt động
- [ ] Không có lỗi 500 trong logs

### 12. Functionality Test
- [ ] Tạo dòng họ mới
- [ ] Thêm thành viên
- [ ] Xem cây gia phả
- [ ] Tìm kiếm thành viên
- [ ] Xem thống kê
- [ ] Logout/Login lại

### 13. Performance & Monitoring
- [ ] Page load time chấp nhận được (<5 giây)
- [ ] API response time OK
- [ ] Không có memory leaks trong logs
- [ ] Database connection stable

### 14. Documentation
- [ ] URL production đã được ghi lại
- [ ] Credentials đã được lưu an toàn
- [ ] Team members có access (nếu cần)
- [ ] Backup plan đã được thiết lập

---

## 🔧 Optional (Nâng cao)

### 15. Custom Domain (Optional)
- [ ] Domain đã mua (nếu có)
- [ ] DNS đã được cấu hình
- [ ] SSL certificate active
- [ ] CORS_ORIGIN đã được cập nhật

### 16. Monitoring & Alerts (Optional)
- [ ] Setup monitoring với UptimeRobot
- [ ] Email alerts cho downtime
- [ ] Analytics tracking
- [ ] Error reporting (Sentry)

### 17. Backup Strategy
- [ ] MongoDB backup schedule
- [ ] Code backup (GitHub)
- [ ] Environment variables documented

---

## 📞 Emergency Contacts

### Nếu Deploy Thất Bại:

**Build Failed:**
1. Kiểm tra Render logs
2. Kiểm tra build command
3. Test local: `cd backend && npm install && npm run build`

**App Crashes:**
1. Kiểm tra Render logs
2. Verify environment variables
3. Test MongoDB connection
4. Check CORS settings

**Cannot Access:**
1. Kiểm tra Render service status
2. Check domain/URL
3. Clear browser cache
4. Wait for cold start (free tier sleeps)

### Support Resources:
- Render Docs: https://render.com/docs
- MongoDB Docs: https://docs.mongodb.com
- GitHub Issues: Create issue in your repo

---

## 🎉 Success Criteria

Deploy được coi là thành công khi:
- ✅ App accessible tại URL production
- ✅ Users có thể đăng ký/đăng nhập
- ✅ Tất cả tính năng chính hoạt động
- ✅ Database kết nối OK
- ✅ Không có critical errors

---

**Chúc mừng bạn đã deploy thành công! 🚀**

*Lưu file này để tham khảo cho lần deploy tiếp theo.*
