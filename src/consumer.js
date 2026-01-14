require('dotenv').config();
const connectDB = require('./infrastructure/database/mongodb');
const { startConsumer, stopConsumer } = require('./infrastructure/kafka/consumer');

async function start() {
  try {
    await connectDB();
    await startConsumer();
    
    console.log('Consumer process running');

    process.on('SIGTERM', async () => {
      console.log('SIGTERM received, shutting down consumer...');
      await stopConsumer();
      process.exit(0);
    });
    
  } catch (error) {
    console.error('Failed to start consumer:', error);
    process.exit(1);
  }
}

start();