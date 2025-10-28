const { Family, Person } = require('../models');
const { Op } = require('sequelize');

// Lấy tất cả gia đình
exports.getAllFamilies = async (req, res) => {
  try {
    const families = await Family.findAll({
      order: [['createdAt', 'DESC']]
    });
    
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

// Lấy một gia đình
exports.getFamily = async (req, res) => {
  try {
    const family = await Family.findByPk(req.params.id);
    
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

// Tạo gia đình mới
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

// Cập nhật gia đình
exports.updateFamily = async (req, res) => {
  try {
    const [updated] = await Family.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy gia đình này'
      });
    }
    
    const family = await Family.findByPk(req.params.id);
    
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

// Xóa gia đình
exports.deleteFamily = async (req, res) => {
  try {
    const memberCount = await Person.count({ where: { familyId: req.params.id } });
    
    if (memberCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Không thể xóa gia đình có ${memberCount} thành viên`
      });
    }
    
    const deleted = await Family.destroy({ where: { id: req.params.id } });
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy gia đình này'
      });
    }
    
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

// Thống kê gia đình
exports.getFamilyStatistics = async (req, res) => {
  try {
    const family = await Family.findByPk(req.params.id);
    
    if (!family) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy gia đình này'
      });
    }
    
    const persons = await Person.findAll({ where: { familyId: req.params.id } });
    
    const statistics = {
      totalMembers: persons.length,
      totalMales: persons.filter(p => p.gender === 'Nam').length,
      totalFemales: persons.filter(p => p.gender === 'Nữ').length,
      totalGenerations: persons.length > 0 ? Math.max(...persons.map(p => p.generation)) : 0,
      livingMembers: persons.filter(p => p.isAlive).length,
      deceasedMembers: persons.filter(p => !p.isAlive).length,
      membersByGeneration: {}
    };
    
    persons.forEach(p => {
      const gen = p.generation;
      statistics.membersByGeneration[gen] = (statistics.membersByGeneration[gen] || 0) + 1;
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
