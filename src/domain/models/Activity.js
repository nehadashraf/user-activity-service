const mongoose = require("mongoose");
const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    activityType: {
      type: String,
      required: true,
      enum: ["login", "logout", "purchase", "page_view", "other"],
      index: true,
    },
    metadata: {
      type: Object,
      default: {},
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);
activitySchema.index({userId:1,timestamp:-1});
activitySchema.index({activityType:1,timestamp:-1});

module.exports=mongoose.model('Activity',activitySchema);
