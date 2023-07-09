const express=require('express');
const createRouter=express.Router()
const{createLike, removeLike  } = require('../controllers/likeControllers')

createRouter.post('/createLike',  createLike )
createRouter.delete('/removeLike',removeLike )




module.exports=  createRouter;


