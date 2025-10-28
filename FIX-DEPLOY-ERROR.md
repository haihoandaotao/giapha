# 🔧 Hướng dẫn FIX LỖI DEPLOY RENDER

## ❌ Lỗi: "Cannot read properties of null (reading 'replace')"

### 🎯 Nguyên nhân:
- Environment variable **DATABASE_URL** chưa được set trên Render
- Hoặc PostgreSQL database chưa được tạo/link

### ✅ GIẢI PHÁP:

## Bước 1: Tạo PostgreSQL Database (nếu chưa có)

1. Vào Render Dashboard: https://dashboard.render.com
2. Click **New +** → **PostgreSQL**
3. Điền thông tin:
   - **Name:** `giapha-db`
   - **Database:** `giapha`
   - **User:** để mặc định
   - **Region:** **Singapore**
   - **PostgreSQL Version:** 16 (hoặc mới nhất)
   - **Plan:** **Free**
4. Click **Create Database**
5. Đợi 1-2 phút để database được khởi tạo

## Bước 2: Copy Internal Database URL

Sau khi database được tạo:

1. Vào dashboard của database `giapha-db`
2. Tìm phần **Connections**
3. Copy **Internal Database URL** (dạng: `postgresql://giapha_user:xxx@dpg-xxx/giapha_db`)
   
   ⚠️ **QUAN TRỌNG:** Dùng **Internal URL**, KHÔNG dùng External URL!

## Bước 3: Update Environment Variables cho Web Service

1. Vào Web Service `giapha-app` (hoặc tên bạn đặt)
2. Vào tab **Environment**
3. Click **Add Environment Variable**
4. Thêm các biến sau:

```
NODE_ENV=production
DATABASE_URL=<paste_internal_database_url_ở_bước_2>
JWT_SECRET=your_super_secret_jwt_key_min_32_chars_long_12345
JWT_EXPIRE=30d
CORS_ORIGIN=*
PORT=10000
```

**Tạo JWT_SECRET ngẫu nhiên:**
```powershell
# Chạy trong PowerShell để tạo random string
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})
```

5. Click **Save Changes**

## Bước 4: Manual Redeploy

Sau khi save environment variables:

1. Vào tab **Manual Deploy**
2. Click **Clear build cache & deploy**
3. Đợi 5-10 phút để build lại

## Bước 5: Check Logs

Trong quá trình deploy, xem logs để verify:

✅ Phải thấy:
```
✅ PostgreSQL connection established successfully
Models synced successfully
Server running on port 10000
```

❌ Không được thấy:
```
Cannot read properties of null
Unable to connect to PostgreSQL
```

## 🔍 TROUBLESHOOTING

### Nếu vẫn lỗi "Cannot read properties of null":

**Kiểm tra lại DATABASE_URL:**
- Có đúng format: `postgresql://user:pass@host/dbname` không?
- Có chứa ký tự đặc biệt cần encode không?
- Có dùng **Internal URL** (không phải External) không?

### Nếu lỗi "Connection refused":

**Kiểm tra:**
- Database và Web Service có cùng **Region** (Singapore) không?
- Database đã status **Available** chưa?
- Có dùng đúng Internal URL không?

### Nếu lỗi "database does not exist":

**Giải pháp:**
- Xóa và tạo lại database
- Hoặc sửa tên database trong URL cho khớp

## 📝 ALTERNATIVE: Dùng render.yaml

Nếu muốn tự động provision database, update file `render.yaml`:

```yaml
services:
  - type: web
    name: giapha-app
    env: node
    region: singapore
    plan: free
    buildCommand: cd backend && npm install && npm run build
    startCommand: cd backend && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: giapha-db
          property: connectionString
      - key: JWT_SECRET
        generateValue: true
      - key: JWT_EXPIRE
        value: 30d

databases:
  - name: giapha-db
    databaseName: giapha
    plan: free
    region: singapore
```

Sau đó:
1. Commit và push lên GitHub
2. Render sẽ tự động tạo database và link

## ✅ Verify Deploy Thành Công

Sau khi deploy xong, test:

1. **Health check:**
   ```
   https://giapha-app.onrender.com/api/health
   ```
   → Phải trả về JSON

2. **Test register:**
   ```
   POST https://giapha-app.onrender.com/api/auth/register
   Body: {
     "fullName": "Test User",
     "email": "test@example.com",
     "password": "123456"
   }
   ```
   → Phải tạo được user

3. **Frontend:**
   ```
   https://giapha-app.onrender.com
   ```
   → Phải hiện trang web

---

**Làm theo các bước trên và báo lại kết quả nhé!** 💬
