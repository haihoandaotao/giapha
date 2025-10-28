# 🚀 QUICK COMMANDS REFERENCE

## Local Development

### Chạy Backend
```bash
cd backend
npm install
npm run dev
```
Backend: http://localhost:5000

### Chạy Frontend
```bash
cd frontend
npm install
npm start
```
Frontend: http://localhost:3000

---

## Deploy to GitHub

### Cách 1: Sử dụng Script (Dễ nhất)
```bash
.\deploy-github.ps1
```

### Cách 2: Manual
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/giapha.git
git branch -M main
git push -u origin main
```

---

## MongoDB Atlas Setup

1. Truy cập: https://www.mongodb.com/cloud/atlas
2. Tạo FREE cluster (Singapore region)
3. Tạo database user + password
4. Network Access > Add IP: 0.0.0.0/0
5. Copy connection string:
```
mongodb+srv://username:password@cluster.xxxxx.mongodb.net/giapha?retryWrites=true&w=majority
```

---

## Render Deploy

### Quick Steps:
1. Vào: https://render.com
2. New > Web Service
3. Connect GitHub repo: giapha
4. Build Command: `cd backend && npm install && npm run build`
5. Start Command: `cd backend && npm start`
6. Environment Variables:
   - NODE_ENV=production
   - MONGODB_URI=(from Atlas)
   - JWT_SECRET=(random string)
   - CORS_ORIGIN=https://your-app.onrender.com

---

## Useful Commands

### Git Commands
```bash
git status                    # Xem thay đổi
git add .                     # Thêm tất cả files
git commit -m "message"       # Commit
git push                      # Push lên GitHub
git pull                      # Pull từ GitHub
```

### NPM Commands
```bash
npm install                   # Cài dependencies
npm run dev                   # Run development
npm start                     # Run production
npm run build                 # Build React app
```

### Check MongoDB Connection
```bash
# Test connection string
mongosh "mongodb+srv://username:password@cluster.xxxxx.mongodb.net/giapha"
```

---

## Environment Variables Template

### Development (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/giapha
JWT_SECRET=dev_secret_key_change_this
JWT_EXPIRE=30d
CORS_ORIGIN=http://localhost:3000
```

### Production (Render)
```env
PORT=10000
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.net/giapha
JWT_SECRET=strong_random_production_key_here
JWT_EXPIRE=30d
CORS_ORIGIN=https://your-app.onrender.com
```

---

## Troubleshooting Quick Fixes

### MongoDB Connection Error
- Kiểm tra connection string
- Kiểm tra IP whitelist (0.0.0.0/0)
- Kiểm tra username/password

### Port Already in Use
```bash
# Windows: Tìm và kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Git Authentication Error
- Sử dụng Personal Access Token thay password
- Tạo token: GitHub > Settings > Developer settings > Personal access tokens

### Render Build Failed
- Kiểm tra logs trong Render dashboard
- Đảm bảo build command đúng
- Kiểm tra Node version

---

## Quick Links

- **Documentation:** [DOCUMENTATION.md](DOCUMENTATION.md)
- **Deployment Guide:** [DEPLOYMENT.md](DEPLOYMENT.md)
- **GitHub Guide:** [GITHUB.md](GITHUB.md)
- **Quick Start:** [QUICKSTART.md](QUICKSTART.md)

---

## Scripts

```bash
.\pre-deploy-check.ps1    # Kiểm tra trước khi deploy
.\deploy-github.ps1       # Push lên GitHub tự động
```

---

**Happy Coding! 🎉**
