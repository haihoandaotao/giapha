const { sequelize } = require('../config/database');
const User = require('./User');
const Family = require('./Family');
const Person = require('./Person');

// Định nghĩa relationships
Person.belongsTo(Family, { foreignKey: 'familyId', as: 'family' });
Family.hasMany(Person, { foreignKey: 'familyId', as: 'members' });

Person.belongsTo(Person, { foreignKey: 'fatherId', as: 'father' });
Person.belongsTo(Person, { foreignKey: 'motherId', as: 'mother' });
Person.hasMany(Person, { foreignKey: 'fatherId', as: 'childrenAsFather' });
Person.hasMany(Person, { foreignKey: 'motherId', as: 'childrenAsMother' });

// Sync database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('✅ Database synced successfully');
  } catch (error) {
    console.error('❌ Error syncing database:', error);
  }
};

module.exports = {
  sequelize,
  User,
  Family,
  Person,
  syncDatabase
};
