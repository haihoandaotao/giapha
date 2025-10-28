const { Person, Family } = require('../models');
const { Op } = require('sequelize');

// Lấy tất cả thành viên của một gia đình
exports.getAllPersons = async (req, res) => {
  try {
    const { familyId } = req.query;
    
    const where = familyId ? { familyId } : {};
    
    const persons = await Person.findAll({
      where,
      include: [
        { model: Family, attributes: ['name', 'surname'] }
      ],
      order: [['generation', 'ASC'], ['birthDate', 'ASC']]
    });
    
    res.json({
      success: true,
      count: persons.length,
      data: persons
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy danh sách thành viên',
      error: error.message
    });
  }
};

// Lấy một thành viên
exports.getPerson = async (req, res) => {
  try {
    const person = await Person.findByPk(req.params.id, {
      include: [
        { model: Family },
        { model: Person, as: 'father', attributes: ['id', 'fullName', 'birthDate'] },
        { model: Person, as: 'mother', attributes: ['id', 'fullName', 'birthDate'] }
      ]
    });
    
    if (!person) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy thành viên này'
      });
    }
    
    res.json({
      success: true,
      data: person
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin thành viên',
      error: error.message
    });
  }
};

// Tạo thành viên mới
exports.createPerson = async (req, res) => {
  try {
    const person = await Person.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Tạo thành viên thành công',
      data: person
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Lỗi khi tạo thành viên',
      error: error.message
    });
  }
};

// Cập nhật thành viên
exports.updatePerson = async (req, res) => {
  try {
    const [updated] = await Person.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy thành viên này'
      });
    }
    
    const person = await Person.findByPk(req.params.id);
    
    res.json({
      success: true,
      message: 'Cập nhật thành công',
      data: person
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Lỗi khi cập nhật',
      error: error.message
    });
  }
};

// Xóa thành viên
exports.deletePerson = async (req, res) => {
  try {
    const childrenCount = await Person.count({
      where: {
        [Op.or]: [
          { fatherId: req.params.id },
          { motherId: req.params.id }
        ]
      }
    });
    
    if (childrenCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Không thể xóa thành viên có ${childrenCount} con cái`
      });
    }
    
    const deleted = await Person.destroy({ where: { id: req.params.id } });
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy thành viên này'
      });
    }
    
    res.json({
      success: true,
      message: 'Xóa thành viên thành công'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa thành viên',
      error: error.message
    });
  }
};

// Lấy cây gia phả
exports.getFamilyTree = async (req, res) => {
  try {
    const { familyId } = req.params;
    
    const family = await Family.findByPk(familyId);
    if (!family) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy gia đình này'
      });
    }
    
    const persons = await Person.findAll({
      where: { familyId },
      include: [
        { model: Person, as: 'father', attributes: ['id', 'fullName'] },
        { model: Person, as: 'mother', attributes: ['id', 'fullName'] }
      ],
      order: [['generation', 'ASC']]
    });
    
    // Tìm tổ tiên gốc (không có cha mẹ)
    const rootPerson = persons.find(p => !p.fatherId && !p.motherId);
    
    if (!rootPerson) {
      return res.json({
        success: true,
        data: {
          name: family.name,
          children: []
        }
      });
    }
    
    // Hàm đệ quy tạo cây
    const buildTree = (personId) => {
      const person = persons.find(p => p.id === personId);
      if (!person) return null;
      
      const children = persons
        .filter(p => p.fatherId === personId || p.motherId === personId)
        .map(child => buildTree(child.id))
        .filter(Boolean);
      
      return {
        name: person.fullName,
        attributes: {
          id: person.id,
          generation: person.generation,
          birthDate: person.birthDate,
          deathDate: person.deathDate,
          gender: person.gender
        },
        children: children.length > 0 ? children : undefined
      };
    };
    
    const tree = buildTree(rootPerson.id);
    
    res.json({
      success: true,
      data: tree
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo cây gia phả',
      error: error.message
    });
  }
};

// Tìm kiếm thành viên
exports.searchPersons = async (req, res) => {
  try {
    const { query, familyId } = req.query;
    
    const where = {
      [Op.and]: [
        familyId ? { familyId } : {},
        {
          [Op.or]: [
            { fullName: { [Op.iLike]: `%${query}%` } },
            { givenName: { [Op.iLike]: `%${query}%` } },
            { birthPlace: { [Op.iLike]: `%${query}%` } }
          ]
        }
      ]
    };
    
    const persons = await Person.findAll({
      where,
      include: [{ model: Family, attributes: ['name'] }],
      limit: 50
    });
    
    res.json({
      success: true,
      count: persons.length,
      data: persons
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tìm kiếm',
      error: error.message
    });
  }
};

module.exports = exports;
