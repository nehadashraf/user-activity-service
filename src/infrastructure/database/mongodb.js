const mongoose = require('mongoose');
async function connectDB() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/activities';
    console.log('Attempting to connect to MongoDB...');
    console.log('URI:', uri);
    
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection failed!', error.message);
    process.exit(1);
  }
}

module.exports = connectDB;