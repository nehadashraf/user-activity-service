const express = require("express");
const activityRoutes = require("./interfaces/http/routes/activities");

function createApp() {
  const app = express();

  app.use(express.json());
  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });
  app.use("/api/activities", activityRoutes);
  return app;
}

module.exports = createApp;
