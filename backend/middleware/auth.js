const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Middleware bảo vệ routes (yêu cầu đăng nhập)
exports.protect = async (req, res, next) => {
  let token;
  
  // Lấy token từ header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  // Kiểm tra token có tồn tại
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Không có quyền truy cập. Vui lòng đăng nhập'
    });
  }
  
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Lấy thông tin user từ token
    req.user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User không tồn tại'
      });
    }
    
    if (!req.user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Tài khoản đã bị khóa'
      });
    }
    
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token không hợp lệ hoặc đã hết hạn'
    });
  }
};

// Middleware kiểm tra quyền admin của gia đình
exports.familyAdmin = async (req, res, next) => {
  try {
    const familyId = req.params.id || req.body.family;
    
    if (!familyId) {
      return res.status(400).json({
        success: false,
        message: 'Không tìm thấy ID gia đình'
      });
    }
    
    // Kiểm tra user có phải admin của gia đình này không
    const userFamily = req.user.families.find(
      f => f.family.toString() === familyId && f.role === 'admin'
    );
    
    if (!userFamily) {
      return res.status(403).json({
        success: false,
        message: 'Bạn không có quyền quản trị gia đình này'
      });
    }
    
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi kiểm tra quyền',
      error: error.message
    });
  }
};

// Middleware kiểm tra quyền editor (có thể chỉnh sửa)
exports.familyEditor = async (req, res, next) => {
  try {
    const familyId = req.params.id || req.body.family;
    
    if (!familyId) {
      return res.status(400).json({
        success: false,
        message: 'Không tìm thấy ID gia đình'
      });
    }
    
    // Kiểm tra user có phải admin hoặc editor
    const userFamily = req.user.families.find(
      f => f.family.toString() === familyId && 
      (f.role === 'admin' || f.role === 'editor')
    );
    
    if (!userFamily) {
      return res.status(403).json({
        success: false,
        message: 'Bạn không có quyền chỉnh sửa gia đình này'
      });
    }
    
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Lỗi khi kiểm tra quyền',
      error: error.message
    });
  }
};

module.exports = exports;
