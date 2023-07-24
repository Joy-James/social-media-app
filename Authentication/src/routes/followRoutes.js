const express=require('express');
const createfollowRouter=express.Router()
const{createFriendship, updateFriendship, unfriend  } = require('../controllers/followControllers')

createfollowRouter.post('/createfriend',  createFriendship )
createfollowRouter.put('/updatefriend',  updateFriendship)
createfollowRouter.delete('/unfriend',   unfriend )



module.exports=  createfollowRouter;


