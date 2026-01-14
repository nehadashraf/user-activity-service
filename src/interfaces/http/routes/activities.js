const express=require('express');
const router=express.Router();
const activityController=require('../controllers/ActivityController');
const { model } = require('mongoose');

router.post('/',activityController.create);
router.get('/',activityController.getAll);

module.exports=router;