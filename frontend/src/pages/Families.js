import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Families = () => {
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchFamilies();
  }, []);

  const fetchFamilies = async () => {
    try {
      const res = await axios.get('/api/families');
      setFamilies(res.data.data);
    } catch (error) {
      toast.error('Lỗi khi tải danh sách dòng họ');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFamilies = families.filter(family =>
    family.familyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Danh Sách Dòng Họ</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div className="search-box">
            <input
              type="text"
              placeholder="Tìm kiếm dòng họ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <Link to="/family/create" className="btn btn-primary">
            + Tạo Dòng Họ Mới
          </Link>
        </div>
      </div>

      {filteredFamilies.length === 0 ? (
        <div className="empty-state">
          <p>Không tìm thấy dòng họ nào</p>
          <Link to="/family/create" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            + Tạo Dòng Họ Đầu Tiên
          </Link>
        </div>
      ) : (
        <div className="grid">
          {filteredFamilies.map(family => (
            <Link to={`/family/${family._id}`} key={family._id} className="family-card">
              <h3>{family.familyName}</h3>
              {family.ancestor && (
                <p className="ancestor-info">
                  Tổ tiên: {family.ancestor.name}
                </p>
              )}
              <div className="family-stats">
                <div className="stat-item">
                  <div className="stat-value">{family.statistics?.totalMembers || 0}</div>
                  <div className="stat-label">Thành viên</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{family.statistics?.totalGenerations || 0}</div>
                  <div className="stat-label">Thế hệ</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Families;
