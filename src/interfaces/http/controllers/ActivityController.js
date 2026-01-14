const activityService = require('../../../domain/services/ActivityService');
const { sendActivity } = require('../../../infrastructure/kafka/producer');

class ActivityController {
  async create(req, res) {
    try {
      const { userId, activityType, metadata } = req.body;
      if (!userId || !activityType) {
        return res.status(400).json({
          error: 'userId and activityType are required'
        });
      }
      const activity = {
        userId,
        activityType,
        metadata: metadata || {},
        timestamp: new Date()
      };
      await sendActivity(activity);
      res.status(202).json({
        message: 'Activity accepted for processing',
        activity
      });
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const { userId, activityType, page, limit } = req.query;
      const filters = { userId, activityType };
      const options = { page, limit };
      const result = await activityService.getActivities(filters, options);
      res.json(result);    
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

module.exports = new ActivityController();