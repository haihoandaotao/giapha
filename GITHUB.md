# 📚 Hướng Dẫn Push Code Lên GitHub

## Bước 1: Tạo Repository Trên GitHub

1. Đăng nhập vào https://github.com
2. Click nút **"+"** ở góc trên bên phải > **"New repository"**
3. Điền thông tin:
   - **Repository name:** `giapha`
   - **Description:** `Hệ thống quản lý gia phả dòng họ - Family Tree Management System`
   - **Visibility:** Chọn **Public** (hoặc **Private** nếu muốn)
   - **KHÔNG** tick vào "Add a README file"
   - **KHÔNG** thêm .gitignore
   - **KHÔNG** chọn license (đã có sẵn trong code)
4. Click **"Create repository"**

## Bước 2: Cài Đặt Git (Nếu Chưa Có)

### Kiểm tra Git đã cài chưa:
```bash
git --version
```

### Nếu chưa có Git:
1. Download từ: https://git-scm.com/download/win
2. Cài đặt với các tùy chọn mặc định
3. Restart PowerShell

### Cấu hình Git (lần đầu):
```bash
git config --global user.name "Tên Của Bạn"
git config --global user.email "email@example.com"
```

## Bước 3: Push Code Lên GitHub

Mở PowerShell trong thư mục `D:\Project\giapha` và chạy từng lệnh:

### 3.1. Khởi tạo Git repository
```bash
git init
```

### 3.2. Thêm tất cả files
```bash
git add .
```

### 3.3. Commit lần đầu
```bash
git commit -m "Initial commit - Gia pha management system"
```

### 3.4. Kết nối với GitHub repository
**Thay `YOUR_USERNAME` bằng username GitHub của bạn:**
```bash
git remote add origin https://github.com/YOUR_USERNAME/giapha.git
```

### 3.5. Đổi tên branch thành main
```bash
git branch -M main
```

### 3.6. Push code lên GitHub
```bash
git push -u origin main
```

## Bước 4: Xác Thực GitHub (Nếu Được Yêu Cầu)

GitHub không còn hỗ trợ password authentication. Bạn cần tạo **Personal Access Token**:

### 4.1. Tạo Personal Access Token
1. Vào GitHub > Click avatar > **Settings**
2. Scroll xuống dưới > Click **Developer settings**
3. Click **Personal access tokens** > **Tokens (classic)**
4. Click **Generate new token** > **Generate new token (classic)**
5. Điền thông tin:
   - **Note:** `giapha-deploy`
   - **Expiration:** 90 days (hoặc No expiration)
   - **Select scopes:** Tick vào **repo** (tất cả sub-checkboxes)
6. Click **Generate token**
7. **QUAN TRỌNG:** Copy token ngay (chỉ hiện 1 lần!)

### 4.2. Sử dụng Token khi Push
Khi Git yêu cầu password, dán **token** vào (không phải password GitHub):
```
Username: your_github_username
Password: ghp_xxxxxxxxxxxxxxxxxxxx (paste token here)
```

## Bước 5: Kiểm Tra

1. Truy cập `https://github.com/YOUR_USERNAME/giapha`
2. Bạn sẽ thấy tất cả code đã được upload
3. README.md sẽ hiển thị ở trang chủ repository

## 📝 Các Lệnh Git Hữu Ích

### Xem trạng thái files
```bash
git status
```

### Thêm file cụ thể
```bash
git add filename.js
```

### Commit với message
```bash
git commit -m "Message mô tả thay đổi"
```

### Push code mới
```bash
git push
```

### Pull code mới từ GitHub
```bash
git pull
```

### Xem lịch sử commit
```bash
git log
```

### Tạo branch mới
```bash
git checkout -b feature-name
```

## 🔄 Workflow Hàng Ngày

Sau khi setup xong, mỗi khi thay đổi code:

```bash
# 1. Kiểm tra files đã thay đổi
git status

# 2. Thêm files vào staging
git add .

# 3. Commit với message rõ ràng
git commit -m "Add feature: Thêm tính năng upload ảnh"

# 4. Push lên GitHub
git push
```

## ⚠️ Lưu Ý Quan Trọng

1. **KHÔNG push file .env lên GitHub** (đã có trong .gitignore)
2. **KHÔNG push thư mục node_modules** (đã có trong .gitignore)
3. Luôn viết commit message rõ ràng, dễ hiểu
4. Kiểm tra `git status` trước khi commit
5. Pull code mới trước khi push (nếu làm việc nhóm)

## 🔒 Bảo Mật

- **KHÔNG BAO GIỜ** commit passwords, API keys, tokens vào Git
- File `.env` đã được ignore tự động
- Kiểm tra `.gitignore` hoạt động:
  ```bash
  git status
  # Không thấy file .env, node_modules -> OK!
  ```

## 🐛 Troubleshooting

### "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/giapha.git
```

### "Updates were rejected"
```bash
git pull origin main --rebase
git push origin main
```

### Undo commit cuối cùng (chưa push)
```bash
git reset --soft HEAD~1
```

### Xóa file khỏi Git nhưng giữ trong local
```bash
git rm --cached filename
```

## 📞 Support

Nếu gặp vấn đề:
- GitHub Docs: https://docs.github.com
- Git Docs: https://git-scm.com/doc
- Tạo issue trong repository

---

**Chúc bạn thành công! 🚀**
