const express=require('express');
const createRouter=express.Router()
const{createFriendship, updateFriendship } = require('../controllers/followControllers')

createRouter.post('/createfriend',  createFriendship )
createRouter.put('/updatefriend',  updateFriendship)



module.exports=  createRouter;


