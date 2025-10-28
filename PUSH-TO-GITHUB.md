# 🚀 Hướng dẫn Push lên GitHub

## Bước 1: Tạo Repository trên GitHub

1. Mở trình duyệt và đăng nhập GitHub: https://github.com
2. Click nút **[+]** ở góc trên phải → **New repository**
3. Điền thông tin:
   - **Repository name:** `giapha`
   - **Description:** Hệ thống quản lý gia phả - Family Tree Management System
   - **Visibility:** Public (hoặc Private nếu muốn)
   - **Không tick** "Initialize this repository with a README" (vì đã có code)
4. Click **Create repository**

## Bước 2: Copy URL của Repository

Sau khi tạo xong, GitHub sẽ hiển thị trang hướng dẫn.
Copy URL dạng: `https://github.com/<your-username>/giapha.git`

**Ví dụ:**
- Nếu username là `john123` thì URL là: `https://github.com/john123/giapha.git`

## Bước 3: Chạy lệnh trong PowerShell

Mở PowerShell tại folder `d:\Project\giapha` và chạy:

```powershell
# Thay <your-username> bằng username GitHub thực của bạn
git remote add origin https://github.com/<your-username>/giapha.git

# Push code lên GitHub
git push -u origin main
```

**Lưu ý:** 
- Nếu bị lỗi "remote origin already exists", chạy:
  ```powershell
  git remote remove origin
  git remote add origin https://github.com/<your-username>/giapha.git
  git push -u origin main
  ```

- Nếu GitHub yêu cầu đăng nhập:
  - Username: `<your-github-username>`
  - Password: **Personal Access Token** (không phải password thật)
  
  **Tạo Personal Access Token:**
  1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  2. Generate new token (classic)
  3. Note: "giapha deployment"
  4. Expiration: 90 days (hoặc lâu hơn)
  5. Scopes: Tick **repo** (full control)
  6. Generate token → Copy token (chỉ hiện 1 lần!)
  7. Dùng token này làm password khi git push

## Bước 4: Verify

Sau khi push thành công, kiểm tra:
1. Vào `https://github.com/<your-username>/giapha`
2. Phải thấy tất cả files đã được upload

## Bước 5: Deploy lên Render

Sau khi code đã lên GitHub, đọc file **DEPLOY-CHECKLIST.md** để deploy lên Render!

---

**Nếu gặp lỗi, chụp ảnh màn hình và hỏi lại nhé!** 💬
