const Family = require('../models/Family');
const Person = require('../models/Person');

// @desc    Lấy tất cả gia đình
// @route   GET /api/families
// @access  Public
exports.getAllFamilies = async (req, res) => {
  try {
    const families = await Family.find()
      .populate('administrators', 'fullName email')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: families.length,
      data: families
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách gia đình',
      error: error.message
    });
  }
};

// @desc    Lấy thông tin một gia đình
// @route   GET /api/families/:id
// @access  Public
exports.getFamily = async (req, res) => {
  try {
    const family = await Family.findById(req.params.id)
      .populate('administrators', 'fullName email avatar');
    
    if (!family) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy gia đình này'
      });
    }
    
    res.json({
      success: true,
      data: family
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin gia đình',
      error: error.message
    });
  }
};

// @desc    Tạo gia đình mới
// @route   POST /api/families
// @access  Private
exports.createFamily = async (req, res) => {
  try {
    const family = await Family.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Tạo gia đình thành công',
      data: family
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Lỗi khi tạo gia đình',
      error: error.message
    });
  }
};

// @desc    Cập nhật thông tin gia đình
// @route   PUT /api/families/:id
// @access  Private
exports.updateFamily = async (req, res) => {
  try {
    const family = await Family.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!family) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy gia đình này'
      });
    }
    
    res.json({
      success: true,
      message: 'Cập nhật thành công',
      data: family
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Lỗi khi cập nhật',
      error: error.message
    });
  }
};

// @desc    Xóa gia đình
// @route   DELETE /api/families/:id
// @access  Private
exports.deleteFamily = async (req, res) => {
  try {
    const family = await Family.findById(req.params.id);
    
    if (!family) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy gia đình này'
      });
    }
    
    // Kiểm tra xem có thành viên nào không
    const memberCount = await Person.countDocuments({ family: req.params.id });
    if (memberCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Không thể xóa gia đình có ${memberCount} thành viên. Vui lòng xóa tất cả thành viên trước.`
      });
    }
    
    await family.deleteOne();
    
    res.json({
      success: true,
      message: 'Xóa gia đình thành công'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa gia đình',
      error: error.message
    });
  }
};

// @desc    Lấy thống kê gia đình
// @route   GET /api/families/:id/statistics
// @access  Public
exports.getFamilyStatistics = async (req, res) => {
  try {
    const family = await Family.findById(req.params.id);
    
    if (!family) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy gia đình này'
      });
    }
    
    const persons = await Person.find({ family: req.params.id });
    
    // Thống kê chi tiết
    const statistics = {
      totalMembers: persons.length,
      totalMales: persons.filter(p => p.gender === 'Nam').length,
      totalFemales: persons.filter(p => p.gender === 'Nữ').length,
      totalGenerations: Math.max(...persons.map(p => p.generation), 0),
      livingMembers: persons.filter(p => p.isAlive).length,
      deceasedMembers: persons.filter(p => !p.isAlive).length,
      membersByGeneration: {}
    };
    
    // Đếm thành viên theo thế hệ
    persons.forEach(p => {
      const gen = p.generation;
      if (!statistics.membersByGeneration[gen]) {
        statistics.membersByGeneration[gen] = 0;
      }
      statistics.membersByGeneration[gen]++;
    });
    
    res.json({
      success: true,
      data: statistics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thống kê',
      error: error.message
    });
  }
};

module.exports = exports;
