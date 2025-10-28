// Test PostgreSQL connection
require('dotenv').config();
const { testConnection, syncDatabase } = require('./config/database');
const { User, Family, Person } = require('./models');

async function testDatabase() {
  console.log('🔍 Testing PostgreSQL Connection...\n');
  
  try {
    // Test 1: Connection
    console.log('1️⃣ Testing connection...');
    await testConnection();
    
    // Test 2: Sync models
    console.log('\n2️⃣ Syncing database models...');
    await syncDatabase();
    
    // Test 3: Count records
    console.log('\n3️⃣ Counting records...');
    const userCount = await User.count();
    const familyCount = await Family.count();
    const personCount = await Person.count();
    
    console.log(`   Users: ${userCount}`);
    console.log(`   Families: ${familyCount}`);
    console.log(`   Persons: ${personCount}`);
    
    // Test 4: Create test user (optional)
    if (process.argv.includes('--create-test')) {
      console.log('\n4️⃣ Creating test user...');
      const testUser = await User.create({
        fullName: 'Test User',
        email: 'test@example.com',
        password: '123456',
        role: 'user'
      });
      console.log(`   ✅ Created user: ${testUser.email}`);
    }
    
    console.log('\n✅ All tests passed!\n');
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

testDatabase();
