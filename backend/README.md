# Backend - Hệ Thống Quản Lý Gia Phả

API Backend cho ứng dụng quản lý gia phả

## Cài Đặt

```bash
npm install
```

## Cấu Hình

Tạo file `.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/giapha
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=30d
CORS_ORIGIN=http://localhost:3000
```

## Chạy

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## API Endpoints

Xem file README.md chính để biết chi tiết về API endpoints.
