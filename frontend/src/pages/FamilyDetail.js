import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const FamilyDetail = () => {
  const { id } = useParams();
  const [family, setFamily] = useState(null);
  const [members, setMembers] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFamilyData();
  }, [id]);

  const fetchFamilyData = async () => {
    try {
      const [familyRes, membersRes, statsRes] = await Promise.all([
        axios.get(`/api/families/${id}`),
        axios.get(`/api/persons?familyId=${id}`),
        axios.get(`/api/families/${id}/statistics`)
      ]);

      setFamily(familyRes.data.data);
      setMembers(membersRes.data.data);
      setStatistics(statsRes.data.data);
    } catch (error) {
      toast.error('Lỗi khi tải thông tin gia đình');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  if (!family) {
    return <div className="error">Không tìm thấy gia đình</div>;
  }

  return (
    <div className="container">
      <div className="family-detail">
        <div className="family-header">
          <h1>{family.familyName}</h1>
          <Link to={`/family-tree/${id}`} className="btn btn-primary">
            Xem Cây Gia Phả
          </Link>
        </div>

        {family.ancestor && (
          <div className="card">
            <h2>Thông Tin Tổ Tiên</h2>
            <p><strong>Tên:</strong> {family.ancestor.name}</p>
            {family.ancestor.origin && (
              <p><strong>Xuất xứ:</strong> {family.ancestor.origin}</p>
            )}
            {family.ancestor.biography && (
              <div>
                <strong>Tiểu sử:</strong>
                <p>{family.ancestor.biography}</p>
              </div>
            )}
          </div>
        )}

        {statistics && (
          <div className="card">
            <h2>Thống Kê</h2>
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-value">{statistics.totalMembers}</div>
                <div className="stat-label">Tổng thành viên</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">{statistics.totalGenerations}</div>
                <div className="stat-label">Số thế hệ</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">{statistics.totalMales}</div>
                <div className="stat-label">Nam</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">{statistics.totalFemales}</div>
                <div className="stat-label">Nữ</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">{statistics.livingMembers}</div>
                <div className="stat-label">Còn sống</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">{statistics.deceasedMembers}</div>
                <div className="stat-label">Đã mất</div>
              </div>
            </div>
          </div>
        )}

        <div className="card">
          <h2>Danh Sách Thành Viên</h2>
          {members.length === 0 ? (
            <p>Chưa có thành viên nào</p>
          ) : (
            <div className="members-list">
              {members.map(member => (
                <Link to={`/person/${member._id}`} key={member._id} className="member-item">
                  <div className="member-info">
                    <strong>{member.fullName}</strong>
                    <span className="generation-badge">Đời {member.generation}</span>
                  </div>
                  <div className="member-meta">
                    <span className={`gender-badge ${member.gender.toLowerCase()}`}>
                      {member.gender}
                    </span>
                    {member.dateOfBirth && (
                      <span>Sinh: {new Date(member.dateOfBirth).getFullYear()}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FamilyDetail;
