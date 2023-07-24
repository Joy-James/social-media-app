const express=require('express');
const likeRouter=express.Router()
const{createLike, removeLike,checkLikeStatus  } = require('../controllers/likeControllers')

likeRouter.post('/createLike',  createLike )
likeRouter.delete('/removeLike',removeLike )
likeRouter.get('/checkLikeStatus/:post_id',checkLikeStatus)




module.exports=  likeRouter;


