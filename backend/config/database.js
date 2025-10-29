const { Sequelize } = require('sequelize');

// Khởi tạo Sequelize - Dùng SQLite nếu không có DATABASE_URL
let sequelize;

if (process.env.DATABASE_URL) {
  // Dùng PostgreSQL nếu có DATABASE_URL
  console.log('✅ Using PostgreSQL:', process.env.DATABASE_URL.replace(/:[^:@]+@/, ':****@'));
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    dialectOptions: {
      ssl: process.env.NODE_ENV === 'production' ? {
        require: true,
        rejectUnauthorized: false
      } : false
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
} else {
  // Dùng SQLite nếu không có DATABASE_URL
  console.log('⚠️  DATABASE_URL not found, using SQLite instead');
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: process.env.NODE_ENV === 'development' ? console.log : false
  });
}

// Test connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connection established successfully');
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to PostgreSQL:', error);
    return false;
  }
};

module.exports = { sequelize, testConnection };
