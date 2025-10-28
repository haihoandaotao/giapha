import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <div className="dashboard">
        <h1>Dashboard</h1>
        <div className="card">
          <h2>Chào mừng, {user.fullName}!</h2>
          <p>Đây là trang quản lý của bạn. Các tính năng quản lý sẽ được phát triển tiếp.</p>
          
          <div className="dashboard-stats">
            <div className="stat-box">
              <div className="stat-value">{user.families?.length || 0}</div>
              <div className="stat-label">Gia đình đang quản lý</div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2>Thông Tin Tài Khoản</h2>
          <div className="info-grid">
            <div className="info-item">
              <strong>Tên đăng nhập:</strong>
              <span>{user.username}</span>
            </div>
            <div className="info-item">
              <strong>Email:</strong>
              <span>{user.email}</span>
            </div>
            <div className="info-item">
              <strong>Họ tên:</strong>
              <span>{user.fullName}</span>
            </div>
            {user.phoneNumber && (
              <div className="info-item">
                <strong>Số điện thoại:</strong>
                <span>{user.phoneNumber}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
