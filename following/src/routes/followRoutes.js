const express=require('express');
const createRouter=express.Router()
const{createFriendship, updateFriendship, unfriend  } = require('../controllers/followControllers')

createRouter.post('/createfriend',  createFriendship )
createRouter.put('/updatefriend',  updateFriendship)
createRouter.delete('/unfriend',   unfriend )



module.exports=  createRouter;


