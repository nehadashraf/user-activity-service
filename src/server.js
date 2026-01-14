require("dotenv").config();

const createApp = require("./app");
const connectDB = require("./infrastructure/database/mongodb");
const {
  connectProducer,
  disconnectProducer,
} = require("./infrastructure/kafka/producer");

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await connectDB();
    await connectProducer();
    const app = createApp();

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    process.on("SIGTERM", async () => {
      console.log("SIGTERM received, shutting down...");
      server.close(async () => {
        await disconnectProducer();
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

start();
