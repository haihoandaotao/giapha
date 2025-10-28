const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Person = sequelize.define('Person', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gender: {
    type: DataTypes.ENUM('Nam', 'Nữ'),
    allowNull: false
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: true
  },
  dateOfDeath: {
    type: DataTypes.DATE,
    allowNull: true
  },
  isAlive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  occupation: {
    type: DataTypes.STRING,
    allowNull: true
  },
  education: {
    type: DataTypes.STRING,
    allowNull: true
  },
  generation: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  // Foreign keys
  familyId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'families',
      key: 'id'
    }
  },
  fatherId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'persons',
      key: 'id'
    }
  },
  motherId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'persons',
      key: 'id'
    }
  },
  // Vợ/chồng (JSON array)
  spouses: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  burialPlace: {
    type: DataTypes.STRING,
    allowNull: true
  },
  position: {
    type: DataTypes.JSONB,
    defaultValue: {}
  }
}, {
  tableName: 'persons',
  timestamps: true,
  hooks: {
    beforeSave: (person) => {
      if (person.dateOfDeath) {
        person.isAlive = false;
      }
    }
  }
});

module.exports = Person;
