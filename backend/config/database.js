const { Sequelize } = require('sequelize');

// Kiểm tra DATABASE_URL
if (!process.env.DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL is not defined in environment variables!');
  console.log('ℹ️  Please set DATABASE_URL in your .env file or Render dashboard');
  console.log('ℹ️  Example: DATABASE_URL=postgresql://user:pass@host:5432/dbname');
  process.exit(1);
}

console.log('✅ DATABASE_URL found:', process.env.DATABASE_URL.replace(/:[^:@]+@/, ':****@'));

// Khởi tạo Sequelize với DATABASE_URL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
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
