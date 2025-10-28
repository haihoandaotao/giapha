import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Hệ Thống Quản Lý Gia Phả Dòng Họ</h1>
            <p className="hero-subtitle">
              Ghi nhớ nguồn cội, kết nối thế hệ, lưu giữ truyền thống
            </p>
            <div className="hero-buttons">
              <Link to="/families" className="btn btn-primary btn-large">
                Khám Phá Dòng Họ
              </Link>
              <Link to="/register" className="btn btn-secondary btn-large">
                Tạo Gia Phả
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Tính Năng Nổi Bật</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌳</div>
              <h3>Cây Gia Phả Trực Quan</h3>
              <p>Hiển thị cây gia phả đầy đủ với nhiều thế hệ, dễ dàng theo dõi quan hệ huyết thống</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Quản Lý Thành Viên</h3>
              <p>Thêm, sửa, xóa thông tin thành viên, lưu trữ hình ảnh và tiểu sử</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Tìm Kiếm Nhanh</h3>
              <p>Tìm kiếm thành viên theo tên, thế hệ, và nhiều tiêu chí khác</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Thống Kê Chi Tiết</h3>
              <p>Xem thống kê số lượng thành viên, thế hệ, và phân bố theo giới tính</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Lịch Giỗ Tổ</h3>
              <p>Ghi nhớ và nhắc nhở các ngày giỗ quan trọng của tổ tiên</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <h3>Bảo Mật Cao</h3>
              <p>Quản lý quyền truy cập, bảo vệ thông tin gia đình</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Bắt Đầu Ngay Hôm Nay</h2>
          <p>Tạo gia phả kỹ thuật số cho dòng họ của bạn</p>
          <Link to="/register" className="btn btn-primary btn-large">
            Đăng Ký Miễn Phí
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
