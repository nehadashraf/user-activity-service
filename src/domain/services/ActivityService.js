const { model } = require("mongoose");
const activityRepository=require("../repositories/ActivityRepository");

class ActivityService{
  async saveActivity(activityData){
    const savedActivity=await activityRepository.create(activityData);
    console.log("Saved Activity",savedActivity);
    return savedActivity;
  }
  async getActivities(filters={},options={}){
    const result=await activityRepository.findWithFilters(filters,options);
    return {
      activities:result.activities,
      pagination:{
        totalActivites:result.totalActivites,
        page:result.page,
        limit:result.limit,
        totalPages:result.totalpages
      }
    }
  }
}
module.exports=new ActivityService();