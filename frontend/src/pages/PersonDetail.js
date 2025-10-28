import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const PersonDetail = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPerson();
  }, [id]);

  const fetchPerson = async () => {
    try {
      const res = await axios.get(`/api/persons/${id}`);
      setPerson(res.data.data);
    } catch (error) {
      toast.error('Lỗi khi tải thông tin người');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Đang tải...</div>;
  }

  if (!person) {
    return <div className="error">Không tìm thấy người này</div>;
  }

  return (
    <div className="container">
      <div className="person-detail">
        <div className="card">
          <div className="person-header">
            {person.avatar ? (
              <img src={person.avatar} alt={person.fullName} className="person-avatar-large" />
            ) : (
              <div className="person-avatar-placeholder-large">
                {person.gender === 'Nam' ? '👨' : '👩'}
              </div>
            )}
            <div>
              <h1>{person.fullName}</h1>
              <p className="person-generation">Đời {person.generation}</p>
            </div>
          </div>

          <div className="person-info-grid">
            <div className="info-item">
              <strong>Giới tính:</strong>
              <span className={`gender-badge ${person.gender.toLowerCase()}`}>
                {person.gender}
              </span>
            </div>
            
            {person.dateOfBirth && (
              <div className="info-item">
                <strong>Ngày sinh:</strong>
                <span>{new Date(person.dateOfBirth).toLocaleDateString('vi-VN')}</span>
              </div>
            )}
            
            {person.dateOfDeath && (
              <div className="info-item">
                <strong>Ngày mất:</strong>
                <span>{new Date(person.dateOfDeath).toLocaleDateString('vi-VN')}</span>
              </div>
            )}
            
            <div className="info-item">
              <strong>Trạng thái:</strong>
              <span className={person.isAlive ? 'status-alive' : 'status-deceased'}>
                {person.isAlive ? 'Còn sống' : 'Đã mất'}
              </span>
            </div>
            
            {person.phoneNumber && (
              <div className="info-item">
                <strong>Điện thoại:</strong>
                <span>{person.phoneNumber}</span>
              </div>
            )}
            
            {person.email && (
              <div className="info-item">
                <strong>Email:</strong>
                <span>{person.email}</span>
              </div>
            )}
            
            {person.address && (
              <div className="info-item">
                <strong>Địa chỉ:</strong>
                <span>{person.address}</span>
              </div>
            )}
            
            {person.occupation && (
              <div className="info-item">
                <strong>Nghề nghiệp:</strong>
                <span>{person.occupation}</span>
              </div>
            )}
            
            {person.education && (
              <div className="info-item">
                <strong>Học vấn:</strong>
                <span>{person.education}</span>
              </div>
            )}
          </div>
        </div>

        {/* Quan hệ gia đình */}
        <div className="card">
          <h2>Quan Hệ Gia Đình</h2>
          
          {person.father && (
            <div className="relation-section">
              <strong>Cha:</strong>
              <div className="relation-person">
                {person.father.fullName}
              </div>
            </div>
          )}
          
          {person.mother && (
            <div className="relation-section">
              <strong>Mẹ:</strong>
              <div className="relation-person">
                {person.mother.fullName}
              </div>
            </div>
          )}
          
          {person.spouses && person.spouses.length > 0 && (
            <div className="relation-section">
              <strong>Vợ/Chồng:</strong>
              {person.spouses.map((spouse, index) => (
                <div key={index} className="relation-person">
                  {spouse.person.fullName}
                  {spouse.marriageDate && (
                    <span className="relation-date">
                      (Kết hôn: {new Date(spouse.marriageDate).getFullYear()})
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {person.children && person.children.length > 0 && (
            <div className="relation-section">
              <strong>Con cái:</strong>
              <div className="children-list">
                {person.children.map((child, index) => (
                  <div key={index} className="relation-person">
                    {child.fullName} ({child.gender})
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {person.notes && (
          <div className="card">
            <h2>Ghi Chú</h2>
            <p>{person.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonDetail;
