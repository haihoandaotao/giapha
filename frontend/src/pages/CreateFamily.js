import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateFamily = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    surname: '',
    familyName: '',
    origin: '',
    description: '',
    ancestorName: '',
    ancestorBirthYear: '',
    ancestorDeathYear: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.surname || !formData.familyName) {
      toast.error('Vui lòng điền đầy đủ họ và tên dòng họ');
      return;
    }

    setLoading(true);
    
    try {
      const payload = {
        surname: formData.surname,
        familyName: formData.familyName,
        origin: formData.origin || undefined,
        description: formData.description || undefined
      };

      // Thêm thông tin tổ tiên nếu có
      if (formData.ancestorName) {
        payload.ancestor = {
          name: formData.ancestorName,
          birthYear: formData.ancestorBirthYear ? parseInt(formData.ancestorBirthYear) : undefined,
          deathYear: formData.ancestorDeathYear ? parseInt(formData.ancestorDeathYear) : undefined
        };
      }

      const res = await axios.post('/api/families', payload);
      
      toast.success('Tạo dòng họ thành công!');
      navigate('/families');
    } catch (error) {
      console.error('Error creating family:', error);
      toast.error(error.response?.data?.message || 'Lỗi khi tạo dòng họ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Tạo Dòng Họ Mới</h1>
      </div>

      <div className="form-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Họ <span style={{ color: 'red' }}>*</span></label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              placeholder="Ví dụ: Nguyễn"
              required
            />
          </div>

          <div className="form-group">
            <label>Tên Dòng Họ <span style={{ color: 'red' }}>*</span></label>
            <input
              type="text"
              name="familyName"
              value={formData.familyName}
              onChange={handleChange}
              placeholder="Ví dụ: Dòng họ Nguyễn Văn"
              required
            />
          </div>

          <div className="form-group">
            <label>Nguồn Gốc</label>
            <input
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              placeholder="Ví dụ: Hà Nội, Việt Nam"
            />
          </div>

          <div className="form-group">
            <label>Mô Tả</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Mô tả về dòng họ..."
              rows="4"
            />
          </div>

          <hr style={{ margin: '2rem 0' }} />
          
          <h3 style={{ marginBottom: '1rem' }}>Thông Tin Tổ Tiên (Tùy chọn)</h3>

          <div className="form-group">
            <label>Tên Tổ Tiên</label>
            <input
              type="text"
              name="ancestorName"
              value={formData.ancestorName}
              onChange={handleChange}
              placeholder="Ví dụ: Nguyễn Văn A"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Năm Sinh</label>
              <input
                type="number"
                name="ancestorBirthYear"
                value={formData.ancestorBirthYear}
                onChange={handleChange}
                placeholder="Ví dụ: 1900"
                min="1000"
                max="2100"
              />
            </div>

            <div className="form-group">
              <label>Năm Mất</label>
              <input
                type="number"
                name="ancestorDeathYear"
                value={formData.ancestorDeathYear}
                onChange={handleChange}
                placeholder="Ví dụ: 1980"
                min="1000"
                max="2100"
              />
            </div>
          </div>

          <div className="form-actions" style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Đang tạo...' : 'Tạo Dòng Họ'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate('/families')}
              disabled={loading}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFamily;
