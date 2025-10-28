# 🚀 Hướng Dẫn Deploy Lên Render

Hướng dẫn chi tiết để deploy ứng dụng Quản Lý Gia Phả lên Render.

## 📋 Yêu Cầu Trước Khi Deploy

1. Tài khoản GitHub (miễn phí)
2. Tài khoản Render (miễn phí) - https://render.com
3. Tài khoản MongoDB Atlas (miễn phí) - https://www.mongodb.com/cloud/atlas

## Bước 1: Tạo MongoDB Atlas Database (Miễn Phí)

### 1.1. Đăng ký MongoDB Atlas
1. Truy cập https://www.mongodb.com/cloud/atlas
2. Click "Try Free" và đăng ký tài khoản
3. Chọn "Shared" (FREE) tier

### 1.2. Tạo Cluster
1. Chọn Cloud Provider: **AWS** hoặc **Google Cloud**
2. Chọn Region gần Việt Nam nhất: **Singapore (ap-southeast-1)**
3. Cluster Name: `giapha-cluster`
4. Click "Create Cluster" (chờ 3-5 phút)

### 1.3. Tạo Database User
1. Vào **Database Access** > **Add New Database User**
2. Username: `giapha_admin`
3. Password: Tạo password mạnh (lưu lại)
4. Database User Privileges: **Read and write to any database**
5. Click "Add User"

### 1.4. Whitelist IP
1. Vào **Network Access** > **Add IP Address**
2. Click "Allow Access from Anywhere" (0.0.0.0/0)
3. Click "Confirm"

### 1.5. Lấy Connection String
1. Vào **Database** > Click "Connect"
2. Chọn "Connect your application"
3. Driver: **Node.js**, Version: **5.5 or later**
4. Copy connection string, dạng:
   ```
   mongodb+srv://giapha_admin:<password>@giapha-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Thay `<password>` bằng password đã tạo
6. Thêm database name vào cuối: `/giapha`
   ```
   mongodb+srv://giapha_admin:yourpassword@giapha-cluster.xxxxx.mongodb.net/giapha?retryWrites=true&w=majority
   ```

## Bước 2: Push Code Lên GitHub

### 2.1. Tạo Repository Mới Trên GitHub
1. Truy cập https://github.com
2. Click nút **"+"** > **"New repository"**
3. Repository name: `giapha`
4. Description: `Hệ thống quản lý gia phả dòng họ`
5. Chọn **Public** hoặc **Private**
6. **KHÔNG** chọn "Add a README file"
7. Click "Create repository"

### 2.2. Push Code Từ Máy Local

Mở PowerShell trong thư mục `D:\Project\giapha` và chạy:

```bash
# Khởi tạo git repository
git init

# Thêm tất cả files
git add .

# Commit
git commit -m "Initial commit - Gia pha app"

# Thêm remote (thay YOUR_USERNAME bằng username GitHub của bạn)
git remote add origin https://github.com/YOUR_USERNAME/giapha.git

# Push lên GitHub
git branch -M main
git push -u origin main
```

**Lưu ý:** Nếu GitHub yêu cầu đăng nhập, sử dụng Personal Access Token thay vì password.

### 2.3. Tạo GitHub Personal Access Token (nếu cần)
1. Vào GitHub > **Settings** > **Developer settings** > **Personal access tokens** > **Tokens (classic)**
2. Click "Generate new token (classic)"
3. Note: `giapha-deploy`
4. Chọn scope: **repo** (tất cả)
5. Click "Generate token"
6. Copy token (chỉ hiện 1 lần!)
7. Sử dụng token này thay cho password khi push

## Bước 3: Deploy Lên Render

### 3.1. Tạo Tài Khoản Render
1. Truy cập https://render.com
2. Click "Get Started for Free"
3. Đăng ký bằng GitHub (recommended)

### 3.2. Tạo Web Service
1. Từ Render Dashboard, click **"New +"** > **"Web Service"**
2. Click "Connect account" để kết nối GitHub
3. Chọn repository **"giapha"**
4. Click "Connect"

### 3.3. Cấu Hình Web Service

**Basic Settings:**
- Name: `giapha-app` (hoặc tên bạn muốn)
- Region: **Singapore** (gần Việt Nam nhất)
- Branch: `main`
- Root Directory: (để trống)
- Runtime: **Node**
- Build Command: 
  ```
  cd backend && npm install && npm run build
  ```
- Start Command:
  ```
  cd backend && npm start
  ```

**Advanced Settings:**
- Instance Type: **Free**
- Auto-Deploy: **Yes** (tự động deploy khi push code mới)

### 3.4. Thêm Environment Variables

Click **"Advanced"** > **"Add Environment Variable"** và thêm:

| Key | Value | Notes |
|-----|-------|-------|
| `NODE_ENV` | `production` | |
| `PORT` | `10000` | Render tự động gán |
| `MONGODB_URI` | `mongodb+srv://...` | Copy từ MongoDB Atlas |
| `JWT_SECRET` | `giapha_prod_secret_2025_xxxxx` | Tạo chuỗi ngẫu nhiên dài |
| `JWT_EXPIRE` | `30d` | |
| `CORS_ORIGIN` | `https://giapha-app.onrender.com` | URL của Render app |

**Lưu ý:** URL Render sẽ có dạng: `https://ten-ban-chon.onrender.com`

### 3.5. Deploy
1. Click **"Create Web Service"**
2. Render sẽ bắt đầu build (5-10 phút)
3. Theo dõi logs để xem quá trình build
4. Khi thấy "Server is running on port 10000" -> Thành công! 🎉

### 3.6. Truy Cập Ứng Dụng
URL của bạn: `https://giapha-app.onrender.com` (hoặc tên bạn đặt)

## 🔧 Troubleshooting

### Build Failed?
- Kiểm tra logs trong Render dashboard
- Đảm bảo `package.json` có đúng scripts
- Kiểm tra Node version

### Cannot Connect to MongoDB?
- Kiểm tra MONGODB_URI có đúng không
- Kiểm tra IP whitelist trong MongoDB Atlas (phải có 0.0.0.0/0)
- Kiểm tra username/password

### App crashes sau khi deploy?
- Kiểm tra logs: `Server > Logs`
- Kiểm tra tất cả environment variables đã được set
- Restart service: `Manual Deploy > Deploy latest commit`

### Free tier sleep sau 15 phút?
- Đây là giới hạn của Render free tier
- App sẽ "wake up" khi có request (mất ~30 giây)
- Nâng lên paid tier để tránh sleep

## 📱 Cập Nhật Ứng Dụng

Sau khi setup xong, mỗi lần thay đổi code:

```bash
# Trong thư mục giapha
git add .
git commit -m "Mô tả thay đổi"
git push origin main
```

Render sẽ tự động build và deploy lại (nếu bật Auto-Deploy).

## 🎯 Các Bước Tiếp Theo

- [ ] Thêm custom domain (nếu có)
- [ ] Setup SSL certificate (Render tự động)
- [ ] Monitor logs và performance
- [ ] Backup MongoDB định kỳ
- [ ] Nâng cấp plan nếu cần (paid tier)

## 💡 Tips

1. **Free tier limitations:**
   - 750 hours/month (đủ cho 1 app chạy 24/7)
   - Sleep sau 15 phút không hoạt động
   - 100GB bandwidth/month

2. **MongoDB Atlas free tier:**
   - 512MB storage (đủ cho ~1000 thành viên)
   - Shared cluster
   - Backup không tự động (cần manual)

3. **Best practices:**
   - Luôn commit code trước khi deploy
   - Test local trước khi push
   - Monitor logs sau mỗi deployment
   - Backup database thường xuyên

## 📞 Support

Nếu gặp vấn đề:
- Render Docs: https://render.com/docs
- MongoDB Docs: https://docs.mongodb.com
- Create issue trên GitHub

---

**Chúc bạn deploy thành công! 🚀**
