const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Family = sequelize.define('Family', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  familyName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  alternativeNames: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  // Tổ tiên gốc (JSON)
  ancestor: {
    type: DataTypes.JSONB,
    defaultValue: {}
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  history: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // Quy ước đặt tên
  namingConvention: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  mainAddress: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // Ngày giỗ tổ
  ancestorMemorialDays: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  // Thống kê
  statistics: {
    type: DataTypes.JSONB,
    defaultValue: {
      totalMembers: 0,
      totalGenerations: 0,
      totalMales: 0,
      totalFemales: 0
    }
  },
  // Privacy settings
  privacySettings: {
    type: DataTypes.JSONB,
    defaultValue: {
      isPublic: false,
      allowSearch: true
    }
  }
}, {
  tableName: 'families',
  timestamps: true
});

module.exports = Family;
