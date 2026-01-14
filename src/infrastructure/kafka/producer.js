const { Kafka } = require('kafkajs');
process.env.KAFKAJS_NO_PARTITIONER_WARNING = '1';

const kafka = new Kafka({
  clientId: 'activity-service',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092']
});
const producer = kafka.producer();
async function connectProducer() {
  console.log('Attempting to connect to Kafka...');
  console.log('Broker:', process.env.KAFKA_BROKER || 'localhost:9092');
  
  await producer.connect();
  console.log('Kafka Producer connected');
}

async function sendActivity(activity) {
  await producer.send({
    topic: process.env.KAFKA_TOPIC || 'user-activities',
    messages: [{
      key: activity.userId,
      value: JSON.stringify(activity),
      timestamp: Date.now().toString()
    }]
  });
  }

async function disconnectProducer() {
  await producer.disconnect();
  console.log('Kafka Producer disconnected');
}

module.exports = { 
  connectProducer, 
  sendActivity,
  disconnectProducer
};