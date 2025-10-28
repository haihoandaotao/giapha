# 📚 Tài Liệu Hướng Dẫn

## 🎯 Mục Lục

1. [README.md](README.md) - Tổng quan dự án, cài đặt local
2. [QUICKSTART.md](QUICKSTART.md) - Hướng dẫn nhanh deploy trong 10 phút
3. [DEPLOYMENT.md](DEPLOYMENT.md) - Hướng dẫn chi tiết deploy lên Render
4. [GITHUB.md](GITHUB.md) - Hướng dẫn sử dụng Git và GitHub
5. File này - Tổng hợp tất cả

---

## 🚀 Bắt Đầu Nhanh

### Phát triển Local (Development)

```bash
# 1. Cài dependencies
cd backend
npm install

cd ../frontend
npm install

# 2. Cấu hình
cd ../backend
copy .env.example .env
# Sửa MONGODB_URI trong file .env

# 3. Chạy ứng dụng (2 terminals)
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

Truy cập: http://localhost:3000

---

## 🌐 Deploy Lên Production

### Cách 1: Sử dụng Script Tự Động (Khuyến nghị)

```bash
# Push lên GitHub
.\deploy-github.ps1
```

Sau đó làm theo [DEPLOYMENT.md](DEPLOYMENT.md) để deploy lên Render.

### Cách 2: Thủ Công

**Bước 1: Push GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/giapha.git
git push -u origin main
```

**Bước 2: Deploy Render**
1. Tạo MongoDB Atlas database
2. Vào Render.com
3. New Web Service
4. Connect GitHub repo
5. Cấu hình environment variables
6. Deploy!

Chi tiết xem: [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 📖 Hướng Dẫn Chi Tiết

### Cho Người Mới Bắt Đầu

1. **Chưa biết Git/GitHub?** 
   → Đọc [GITHUB.md](GITHUB.md)

2. **Muốn deploy nhanh?**
   → Đọc [QUICKSTART.md](QUICKSTART.md)

3. **Cần hướng dẫn từng bước?**
   → Đọc [DEPLOYMENT.md](DEPLOYMENT.md)

### Cho Developer Có Kinh Nghiệm

- Architecture & API: [README.md](README.md)
- Database Schema: [README.md#database-schema](README.md#database-schema)
- API Endpoints: [README.md#api-endpoints](README.md#api-endpoints)

---

## 🔧 Troubleshooting

### Lỗi Local Development

**MongoDB connection error:**
```bash
# Kiểm tra MongoDB đang chạy
mongod --version

# Hoặc đổi sang MongoDB Atlas
# Sửa MONGODB_URI trong .env
```

**Port already in use:**
```bash
# Đổi PORT trong .env (backend)
PORT=5001
```

### Lỗi GitHub

**Cannot push:**
- Kiểm tra đã tạo repository chưa
- Sử dụng Personal Access Token thay password
- Xem chi tiết: [GITHUB.md#troubleshooting](GITHUB.md#troubleshooting)

### Lỗi Render Deploy

**Build failed:**
- Kiểm tra logs trong Render dashboard
- Đảm bảo có file `render.yaml`
- Kiểm tra build command đúng

**App crashes:**
- Kiểm tra environment variables
- Kiểm tra MongoDB connection string
- Xem logs: Render Dashboard > Logs

Chi tiết xem: [DEPLOYMENT.md#troubleshooting](DEPLOYMENT.md#troubleshooting)

---

## 📁 Cấu Trúc Files

```
giapha/
├── backend/              # Node.js Backend
│   ├── controllers/      # Business logic
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth, validation
│   ├── .env.example     # Environment template
│   └── server.js        # Entry point
│
├── frontend/            # React Frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React Context
│   │   └── App.js       # Main app
│   └── package.json
│
├── README.md            # Tổng quan dự án
├── QUICKSTART.md        # Hướng dẫn nhanh
├── DEPLOYMENT.md        # Hướng dẫn deploy
├── GITHUB.md            # Hướng dẫn GitHub
├── render.yaml          # Render config
├── .gitignore           # Git ignore rules
└── deploy-github.ps1    # Script tự động
```

---

## ⚙️ Environment Variables

### Development (.env local)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/giapha
JWT_SECRET=dev_secret_key
CORS_ORIGIN=http://localhost:3000
```

### Production (Render)
```env
PORT=10000
NODE_ENV=production
MONGODB_URI=mongodb+srv://...  # MongoDB Atlas
JWT_SECRET=random_secure_string
CORS_ORIGIN=https://your-app.onrender.com
```

---

## 🎓 Học Thêm

### Công Nghệ Sử Dụng

**Backend:**
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Guide](https://mongoosejs.com/docs/guide.html)

**Frontend:**
- [React Documentation](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)

**Deployment:**
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com/)

---

## 💡 Tips & Best Practices

### Development
- ✅ Test local trước khi push
- ✅ Commit thường xuyên với message rõ ràng
- ✅ Không commit file .env
- ✅ Sử dụng .env.example cho template

### Production
- ✅ Sử dụng strong JWT_SECRET
- ✅ Enable CORS chỉ cho domain của bạn
- ✅ Backup MongoDB định kỳ
- ✅ Monitor logs sau mỗi deployment
- ✅ Sử dụng environment variables cho mọi config

### Security
- 🔒 Không hardcode passwords/secrets
- 🔒 Validate tất cả user input
- 🔒 Sử dụng HTTPS (Render tự động)
- 🔒 Regular update dependencies

---

## 📞 Hỗ Trợ

### Tạo Issue
Nếu gặp vấn đề, tạo issue trên GitHub với:
- Mô tả lỗi
- Steps to reproduce
- Screenshot (nếu có)
- Environment (OS, Node version, etc.)

### Resources
- [GitHub Issues](https://github.com/USERNAME/giapha/issues)
- [Render Community](https://community.render.com/)
- [Stack Overflow](https://stackoverflow.com/)

---

## 📊 Roadmap

### Đã Hoàn Thành ✅
- ✅ Backend API với Express + MongoDB
- ✅ Frontend với React
- ✅ Authentication (JWT)
- ✅ Family tree visualization
- ✅ CRUD operations
- ✅ Deploy documentation

### Sắp Tới 🚧
- [ ] Upload ảnh thành viên
- [ ] Export gia phả PDF
- [ ] Email notifications cho ngày giỗ
- [ ] Mobile responsive improvements
- [ ] Admin dashboard
- [ ] Multi-language support

### Tương Lai 💭
- [ ] Mobile app (React Native)
- [ ] Real-time chat
- [ ] Family forum
- [ ] Donation management
- [ ] Event calendar
- [ ] Photo gallery

---

## 📜 License

MIT License - Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

---

## 👥 Contributing

Contributions are welcome! Vui lòng:
1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

---

**Happy Coding! 🎉**

Nếu project này hữu ích, hãy cho một ⭐ trên GitHub!
