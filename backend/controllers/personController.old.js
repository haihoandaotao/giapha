const Person = require('../models/Person');
const Family = require('../models/Family');

// @desc    Lấy tất cả thành viên trong gia phả
// @route   GET /api/persons
// @access  Public
exports.getAllPersons = async (req, res) => {
  try {
    const { familyId, generation, search } = req.query;
    
    let query = {};
    if (familyId) query.family = familyId;
    if (generation) query.generation = parseInt(generation);
    
    let persons;
    if (search) {
      persons = await Person.find({
        ...query,
        $text: { $search: search }
      })
      .populate('father', 'fullName avatar')
      .populate('mother', 'fullName avatar')
      .populate('spouses.person', 'fullName avatar')
      .populate('children', 'fullName avatar gender')
      .populate('family', 'familyName');
    } else {
      persons = await Person.find(query)
        .populate('father', 'fullName avatar')
        .populate('mother', 'fullName avatar')
        .populate('spouses.person', 'fullName avatar')
        .populate('children', 'fullName avatar gender')
        .populate('family', 'familyName')
        .sort({ generation: 1, dateOfBirth: 1 });
    }
    
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

// @desc    Lấy thông tin một người
// @route   GET /api/persons/:id
// @access  Public
exports.getPerson = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id)
      .populate('father')
      .populate('mother')
      .populate('spouses.person')
      .populate('children')
      .populate('family');
    
    if (!person) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người này'
      });
    }
    
    res.json({
      success: true,
      data: person
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy thông tin người',
      error: error.message
    });
  }
};

// @desc    Tạo người mới
// @route   POST /api/persons
// @access  Private
exports.createPerson = async (req, res) => {
  try {
    const person = await Person.create(req.body);
    
    // Cập nhật thống kê gia đình
    await updateFamilyStatistics(person.family);
    
    // Nếu có cha, thêm vào danh sách con của cha
    if (person.father) {
      await Person.findByIdAndUpdate(person.father, {
        $addToSet: { children: person._id }
      });
    }
    
    // Nếu có mẹ, thêm vào danh sách con của mẹ
    if (person.mother) {
      await Person.findByIdAndUpdate(person.mother, {
        $addToSet: { children: person._id }
      });
    }
    
    res.status(201).json({
      success: true,
      message: 'Thêm thành viên thành công',
      data: person
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Lỗi khi thêm thành viên',
      error: error.message
    });
  }
};

// @desc    Cập nhật thông tin người
// @route   PUT /api/persons/:id
// @access  Private
exports.updatePerson = async (req, res) => {
  try {
    const person = await Person.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!person) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người này'
      });
    }
    
    // Cập nhật thống kê gia đình
    await updateFamilyStatistics(person.family);
    
    res.json({
      success: true,
      message: 'Cập nhật thành công',
      data: person
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Lỗi khi cập nhật thông tin',
      error: error.message
    });
  }
};

// @desc    Xóa người
// @route   DELETE /api/persons/:id
// @access  Private
exports.deletePerson = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    
    if (!person) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người này'
      });
    }
    
    // Kiểm tra xem người này có con không
    if (person.children && person.children.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Không thể xóa người có con cái. Vui lòng xóa con cái trước.'
      });
    }
    
    await person.deleteOne();
    
    // Cập nhật thống kê gia đình
    await updateFamilyStatistics(person.family);
    
    res.json({
      success: true,
      message: 'Xóa thành công'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi xóa',
      error: error.message
    });
  }
};

// @desc    Thêm vợ/chồng
// @route   POST /api/persons/:id/spouse
// @access  Private
exports.addSpouse = async (req, res) => {
  try {
    const { spouseId, marriageDate } = req.body;
    
    const person = await Person.findById(req.params.id);
    const spouse = await Person.findById(spouseId);
    
    if (!person || !spouse) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người'
      });
    }
    
    // Thêm vợ/chồng cho cả 2 người
    person.spouses.push({
      person: spouseId,
      marriageDate: marriageDate,
      isCurrentSpouse: true
    });
    
    spouse.spouses.push({
      person: person._id,
      marriageDate: marriageDate,
      isCurrentSpouse: true
    });
    
    await person.save();
    await spouse.save();
    
    res.json({
      success: true,
      message: 'Thêm vợ/chồng thành công',
      data: person
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Lỗi khi thêm vợ/chồng',
      error: error.message
    });
  }
};

// @desc    Lấy cây gia phả
// @route   GET /api/persons/family-tree/:familyId
// @access  Public
exports.getFamilyTree = async (req, res) => {
  try {
    const persons = await Person.find({ family: req.params.familyId })
      .populate('father', 'fullName avatar gender')
      .populate('mother', 'fullName avatar gender')
      .populate('spouses.person', 'fullName avatar gender')
      .populate('children', 'fullName avatar gender')
      .sort({ generation: 1 });
    
    // Chuyển đổi sang định dạng cây
    const treeData = buildFamilyTree(persons);
    
    res.json({
      success: true,
      data: treeData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi khi lấy cây gia phả',
      error: error.message
    });
  }
};

// Helper function: Cập nhật thống kê gia đình
async function updateFamilyStatistics(familyId) {
  try {
    const persons = await Person.find({ family: familyId });
    
    const stats = {
      totalMembers: persons.length,
      totalMales: persons.filter(p => p.gender === 'Nam').length,
      totalFemales: persons.filter(p => p.gender === 'Nữ').length,
      totalGenerations: Math.max(...persons.map(p => p.generation), 0)
    };
    
    await Family.findByIdAndUpdate(familyId, { statistics: stats });
  } catch (error) {
    console.error('Error updating family statistics:', error);
  }
}

// Helper function: Xây dựng cây gia phả
function buildFamilyTree(persons) {
  // Tìm người gốc (không có cha mẹ)
  const roots = persons.filter(p => !p.father && !p.mother);
  
  const buildNode = (person) => {
    return {
      id: person._id,
      fullName: person.fullName,
      gender: person.gender,
      avatar: person.avatar,
      dateOfBirth: person.dateOfBirth,
      dateOfDeath: person.dateOfDeath,
      isAlive: person.isAlive,
      generation: person.generation,
      spouses: person.spouses,
      children: person.children.map(child => {
        const childPerson = persons.find(p => p._id.toString() === child._id.toString());
        return childPerson ? buildNode(childPerson) : null;
      }).filter(c => c !== null)
    };
  };
  
  return roots.map(root => buildNode(root));
}

module.exports = exports;
