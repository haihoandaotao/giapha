# Quick Start Guide - Deploy to Render

## 📋 Checklist Before Deploy

- [ ] Code đã sẵn sàng và test local thành công
- [ ] Tài khoản GitHub đã tạo
- [ ] Tài khoản MongoDB Atlas đã tạo
- [ ] Tài khoản Render đã tạo

## 🚀 3 Bước Deploy Nhanh

### 1️⃣ Setup MongoDB Atlas (5 phút)
1. Vào https://www.mongodb.com/cloud/atlas
2. Tạo FREE cluster ở Singapore
3. Tạo database user + password
4. Whitelist IP: `0.0.0.0/0`
5. Copy connection string

### 2️⃣ Push to GitHub (2 phút)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/giapha.git
git branch -M main
git push -u origin main
```

### 3️⃣ Deploy on Render (5 phút)
1. Vào https://render.com
2. New > Web Service
3. Connect GitHub repo: `giapha`
4. Settings:
   - Build: `cd backend && npm install && npm run build`
   - Start: `cd backend && npm start`
5. Environment Variables:
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = (từ Atlas)
   - `JWT_SECRET` = (random string)
   - `CORS_ORIGIN` = `https://your-app.onrender.com`
6. Create Web Service
7. Chờ deploy (5-10 phút)

## ✅ Done!

Truy cập: `https://your-app.onrender.com`

---

**Chi tiết xem:**
- [DEPLOYMENT.md](DEPLOYMENT.md) - Hướng dẫn đầy đủ
- [GITHUB.md](GITHUB.md) - Git & GitHub guide
