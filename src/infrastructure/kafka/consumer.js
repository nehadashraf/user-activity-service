const { Kafka } = require('kafkajs');
const activityService = require('../../domain/services/ActivityService');

const kafka = new Kafka({
  clientId: 'activity-service',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092']
});

const consumer = kafka.consumer({ 
  groupId: 'activity-group'
});

async function startConsumer() {
  await consumer.connect();
  await consumer.subscribe({ 
    topic: process.env.KAFKA_TOPIC || 'user-activities',
    fromBeginning: false
  });

  console.log('Kafka Consumer started');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const activity = JSON.parse(message.value.toString());
                await activityService.saveActivity(activity);
        
      } catch (error) {
        console.error('Error processing message:', error);
      }
    }
  });
}

async function stopConsumer() {
  await consumer.disconnect();
  console.log('Kafka Consumer disconnected');
}

module.exports = { 
  startConsumer,
  stopConsumer
};