# Hướng dẫn chuyển đổi sang PostgreSQL

## ✅ Đã hoàn thành

Dự án đã được chuyển đổi hoàn toàn từ **MongoDB + Mongoose** sang **PostgreSQL + Sequelize**.

### Thay đổi chính:

1. **Database**: MongoDB → PostgreSQL
2. **ORM**: Mongoose → Sequelize
3. **Dependencies**: 
   - Đã xóa: `mongoose`
   - Đã thêm: `sequelize`, `pg`, `pg-hstore`

4. **Models**:
   - `User.js`: Chuyển sang Sequelize với UUID primary key
   - `Family.js`: Sử dụng JSONB cho nested objects
   - `Person.js`: Foreign keys và relationships rõ ràng
   - `index.js`: Định nghĩa tất cả relationships

5. **Controllers**:
   - `authController.js`: Đã convert 100%
   - `familyController.js`: Đã convert 100%
   - `personController.js`: Đã convert 100%

6. **Config**:
   - `database.js`: PostgreSQL connection với Sequelize
   - `.env`: DATABASE_URL thay cho MONGODB_URI
   - `render.yaml`: Auto-provision PostgreSQL database

## 🚀 Deployment lên Render

### Bước 1: Push code lên GitHub
```powershell
cd d:\Project\giapha
git add .
git commit -m "Migrated from MongoDB to PostgreSQL"
git push origin main
```

### Bước 2: Tạo Web Service trên Render
1. Vào https://dashboard.render.com
2. New → Web Service
3. Connect GitHub repository `giapha`
4. Cấu hình:
   - **Name**: `giapha-app`
   - **Region**: Singapore
   - **Branch**: main
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

### Bước 3: Tạo PostgreSQL Database
1. Trong dashboard Render → New → PostgreSQL
2. **Name**: `giapha-db`
3. **Region**: Singapore (cùng region với web service)
4. **Plan**: Free
5. Copy **Internal Database URL**

### Bước 4: Link Database với Web Service
1. Vào Web Service → Environment
2. Thêm Environment Variables:
   ```
   NODE_ENV=production
   DATABASE_URL=<paste_internal_database_url>
   JWT_SECRET=<generate_random_string>
   JWT_EXPIRE=30d
   ```

### Bước 5: Deploy!
Render sẽ tự động:
1. Pull code từ GitHub
2. Chạy `npm install` và `npm run build`
3. Tạo database tables (auto sync)
4. Start server

## 🏠 Test Local (nếu có PostgreSQL)

### Cài PostgreSQL Local
```powershell
# Dùng installer từ: https://www.postgresql.org/download/windows/
# Hoặc dùng Docker:
docker run --name postgres-giapha -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
```

### Tạo database
```sql
CREATE DATABASE giapha;
```

### Cập nhật .env
```properties
DATABASE_URL=postgresql://postgres:password@localhost:5432/giapha
```

### Test connection
```powershell
cd d:\Project\giapha\backend
npm test
```

### Run development server
```powershell
npm run dev
```

## 📝 So sánh Syntax

### Mongoose vs Sequelize

#### Find all
```javascript
// Mongoose
const users = await User.find({});

// Sequelize  
const users = await User.findAll({});
```

#### Find by ID
```javascript
// Mongoose
const user = await User.findById(id);

// Sequelize
const user = await User.findByPk(id);
```

#### Find one with condition
```javascript
// Mongoose
const user = await User.findOne({ email });

// Sequelize
const user = await User.findOne({ where: { email } });
```

#### Create
```javascript
// Mongoose
const user = await User.create({ name, email });

// Sequelize
const user = await User.create({ name, email });
// (same!)
```

#### Update
```javascript
// Mongoose
await User.findByIdAndUpdate(id, { name });

// Sequelize
await User.update({ name }, { where: { id } });
```

#### Delete
```javascript
// Mongoose
await User.findByIdAndDelete(id);

// Sequelize
await User.destroy({ where: { id } });
```

#### Populate/Include
```javascript
// Mongoose
const person = await Person.findById(id).populate('family father mother');

// Sequelize
const person = await Person.findByPk(id, {
  include: [
    { model: Family },
    { model: Person, as: 'father' },
    { model: Person, as: 'mother' }
  ]
});
```

## 🎯 Lợi ích của PostgreSQL

1. **FREE trên Render**: PostgreSQL database hoàn toàn miễn phí
2. **Không cần MongoDB Atlas**: Không phải tạo tài khoản riêng
3. **Relational**: Relationships rõ ràng, data integrity tốt hơn
4. **JSONB**: Vẫn lưu được nested objects như MongoDB
5. **Performance**: Indexes, joins, transactions mạnh mẽ
6. **Standard SQL**: Dễ migrate sang RDS, Supabase sau này

## ⚠️ Lưu ý

1. **Free tier Render**:
   - Database: 1GB storage, auto-delete sau 90 ngày không dùng
   - Web service: Sleep sau 15 phút idle
   - Đủ để demo và học tập

2. **Production**:
   - Nên upgrade lên paid plan nếu dùng thật
   - Hoặc migrate sang Railway, Supabase (cũng có free tier tốt)

3. **Backup**:
   - Free tier không có auto backup
   - Nên export data định kỳ nếu quan trọng

## 🔗 Resources

- PostgreSQL Docs: https://www.postgresql.org/docs/
- Sequelize Docs: https://sequelize.org/docs/v6/
- Render PostgreSQL: https://render.com/docs/databases
- Free alternatives: Railway, Supabase, Neon

## ✨ Next Steps

1. ✅ Code đã sẵn sàng deploy
2. 🚀 Push lên GitHub và deploy lên Render
3. 🎨 Frontend vẫn hoạt động như cũ (API không đổi)
4. 🧪 Test tất cả features sau khi deploy
5. 📚 Đọc docs Sequelize để customize thêm

Good luck! 🍀
