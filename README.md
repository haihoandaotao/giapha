# 🏛️ Hệ Thống Quản Lý Gia Phả Dòng Họ

Ứng dụng web quản lý gia phả giúp lưu trữ, quản lý và hiển thị thông tin về dòng họ, quan hệ huyết thống qua các thế hệ.

## 📚 Tài Liệu

- **[QUICKSTART.md](QUICKSTART.md)** - Bắt đầu nhanh trong 10 phút
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Hướng dẫn deploy chi tiết lên Render
- **[GITHUB.md](GITHUB.md)** - Hướng dẫn Git và GitHub
- **[COMMANDS.md](COMMANDS.md)** - Tổng hợp lệnh thường dùng
- **[CHECKLIST.md](CHECKLIST.md)** - Checklist deploy
- **[DOCUMENTATION.md](DOCUMENTATION.md)** - Tài liệu đầy đủ

## ✨ Tính Năng Chính

- 🌳 **Cây gia phả trực quan**: Hiển thị cây gia phả với nhiều thế hệ
- 👥 **Quản lý thành viên**: Thêm, sửa, xóa thông tin thành viên gia đình
- 🔍 **Tìm kiếm**: Tìm kiếm thành viên theo tên, thế hệ
- 📊 **Thống kê**: Xem thống kê số lượng thành viên, thế hệ, phân bố giới tính
- 📅 **Lịch giỗ tổ**: Ghi nhớ ngày giỗ các tổ tiên
- 🔐 **Xác thực người dùng**: Đăng ký, đăng nhập, quản lý quyền
- 📱 **Responsive**: Giao diện thân thiện trên mọi thiết bị

## 🛠️ Công Nghệ Sử Dụng

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database NoSQL
- **Mongoose** - ODM cho MongoDB
- **JWT** - Xác thực người dùng
- **bcryptjs** - Mã hóa mật khẩu

### Frontend
- **React** - UI Library
- **React Router** - Routing
- **Axios** - HTTP client
- **react-d3-tree** - Visualization cây gia phả
- **React Toastify** - Notifications
- **React Icons** - Icons

## 📋 Yêu Cầu Hệ Thống

- Node.js >= 14.x
- MongoDB >= 4.x
- npm hoặc yarn

## 🚀 Cài Đặt và Chạy

### 1. Clone hoặc sử dụng project

```bash
cd d:\Project\giapha
```

### 2. Cài đặt Backend

```bash
cd backend
npm install
```

Tạo file `.env` trong thư mục `backend`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/giapha
JWT_SECRET=your_secret_key_here_change_this
JWT_EXPIRE=30d
CORS_ORIGIN=http://localhost:3000
```

### 3. Cài đặt Frontend

```bash
cd ../frontend
npm install
```

### 4. Khởi động MongoDB

Đảm bảo MongoDB đang chạy trên máy:

```bash
# Windows (nếu đã cài MongoDB)
mongod

# Hoặc sử dụng MongoDB Atlas (cloud database)
```

### 5. Chạy ứng dụng

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Backend sẽ chạy tại: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

Frontend sẽ chạy tại: http://localhost:3000

## 📁 Cấu Trúc Project

```
giapha/
├── backend/
│   ├── controllers/        # Controllers xử lý logic
│   │   ├── authController.js
│   │   ├── familyController.js
│   │   └── personController.js
│   ├── models/            # Database models
│   │   ├── User.js
│   │   ├── Family.js
│   │   └── Person.js
│   ├── routes/            # API routes
│   │   ├── authRoutes.js
│   │   ├── familyRoutes.js
│   │   └── personRoutes.js
│   ├── middleware/        # Middleware
│   │   └── auth.js
│   ├── server.js          # Entry point
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/    # React components
    │   │   └── layout/
    │   │       └── Navbar.js
    │   ├── context/       # React Context
    │   │   └── AuthContext.js
    │   ├── pages/         # Pages
    │   │   ├── Home.js
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Families.js
    │   │   ├── FamilyDetail.js
    │   │   ├── FamilyTree.js
    │   │   ├── PersonDetail.js
    │   │   └── Dashboard.js
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    └── package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký user mới
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Lấy thông tin user hiện tại
- `PUT /api/auth/update` - Cập nhật thông tin
- `PUT /api/auth/change-password` - Đổi mật khẩu

### Families (Dòng Họ)
- `GET /api/families` - Lấy danh sách tất cả dòng họ
- `GET /api/families/:id` - Lấy thông tin một dòng họ
- `POST /api/families` - Tạo dòng họ mới
- `PUT /api/families/:id` - Cập nhật thông tin dòng họ
- `DELETE /api/families/:id` - Xóa dòng họ
- `GET /api/families/:id/statistics` - Thống kê dòng họ

### Persons (Thành Viên)
- `GET /api/persons` - Lấy danh sách thành viên (có filter)
- `GET /api/persons/:id` - Lấy thông tin một người
- `POST /api/persons` - Thêm thành viên mới
- `PUT /api/persons/:id` - Cập nhật thông tin
- `DELETE /api/persons/:id` - Xóa thành viên
- `POST /api/persons/:id/spouse` - Thêm vợ/chồng
- `GET /api/persons/family-tree/:familyId` - Lấy cây gia phả

## 💡 Hướng Dẫn Sử Dụng

### 1. Đăng ký tài khoản
- Truy cập trang đăng ký
- Điền thông tin: họ tên, username, email, mật khẩu
- Nhấn "Đăng ký"

### 2. Tạo dòng họ mới
- Đăng nhập vào hệ thống
- Vào Dashboard
- Tạo dòng họ mới với thông tin tổ tiên

### 3. Thêm thành viên
- Chọn dòng họ
- Nhấn "Thêm thành viên"
- Điền thông tin: tên, giới tính, ngày sinh, quan hệ cha mẹ, v.v.

### 4. Xem cây gia phả
- Vào trang chi tiết dòng họ
- Nhấn "Xem cây gia phả"
- Cây sẽ hiển thị quan hệ huyết thống

## 📝 Database Schema

### User
- username, email, password (hashed)
- fullName, phoneNumber, avatar
- personId (liên kết với Person)
- families (các gia đình user quản lý)

### Family
- familyName (tên dòng họ)
- ancestor (thông tin tổ tiên gốc)
- history (lịch sử dòng họ)
- statistics (thống kê)
- namingConvention (quy ước đặt tên)
- ancestorMemorialDays (ngày giỗ)

### Person
- fullName, gender, dateOfBirth, dateOfDeath
- phoneNumber, email, address
- occupation, education
- family (thuộc dòng họ nào)
- generation (đời thứ mấy)
- father, mother (cha mẹ)
- spouses (vợ/chồng - có thể nhiều)
- children (con cái)
- avatar, notes

## 🔒 Bảo Mật

- Mật khẩu được hash bằng bcryptjs
- JWT token cho authentication
- Middleware bảo vệ các routes quan trọng
- Validation dữ liệu đầu vào

## 🌐 Deploy Lên Production

### Deploy lên Render (Miễn phí)

Xem hướng dẫn chi tiết trong file **[DEPLOYMENT.md](DEPLOYMENT.md)**

**Tóm tắt:**
1. Tạo MongoDB Atlas database (free tier)
2. Push code lên GitHub - xem **[GITHUB.md](GITHUB.md)**
3. Deploy lên Render với 1 click
4. Cấu hình environment variables
5. Truy cập ứng dụng tại `https://your-app.onrender.com`

**Lưu ý:** Free tier của Render sẽ sleep sau 15 phút không hoạt động.

## 🚧 Phát Triển Tiếp

- [ ] Upload ảnh thành viên
- [ ] Export gia phả ra PDF
- [ ] Notification cho ngày giỗ
- [ ] Chat/Forum cho dòng họ
- [ ] Quản lý đóng góp/quỹ dòng họ
- [ ] Timeline sự kiện quan trọng
- [ ] Mobile app

## 🤝 Đóng Góp

Mọi đóng góp đều được hoan nghênh! Hãy tạo issue hoặc pull request.

## 📄 License

MIT License

## 👨‍💻 Tác Giả

Phát triển bởi GitHub Copilot

## 📞 Liên Hệ

Nếu có thắc mắc, vui lòng tạo issue trên GitHub.

---

**Chúc bạn sử dụng thành công! 🎉**
