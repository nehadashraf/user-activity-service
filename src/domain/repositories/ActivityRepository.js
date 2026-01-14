const activity = require("../models/Activity");

class ActivityRepository {
  async create(activityData) {
    return await activity.create(activityData);
  }
  async findWithFilters(filters = {}, options = {}) {
    const { page = 1, limit = 10 } = options;
    const query = {};
    if (filters.userId) query.userId = filters.userId;
    if (filters.activityType) query.activityType = filters.activityType;
    const skip = (page - 1) * limit;

    const [activities, total] = await Promise.all([
      activity.find(query)
        .sort({ timestamp: -1 })
        .limit(parseInt(limit))
        .skip(skip),
      activity.countDocuments(query),
    ]);
    return {
      activities,
      total: total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalpages: Math.ceil(total / limit)
    };
  }
}
module.exports=new ActivityRepository();
