import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          🏛️ Gia Phả
        </Link>
        <ul className="navbar-menu">
          <li><Link to="/">Trang Chủ</Link></li>
          <li><Link to="/families">Dòng Họ</Link></li>
          {user ? (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li>
                <span style={{ marginRight: '10px' }}>
                  Xin chào, {user.fullName}
                </span>
              </li>
              <li><button onClick={logout}>Đăng Xuất</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Đăng Nhập</Link></li>
              <li><Link to="/register">Đăng Ký</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
