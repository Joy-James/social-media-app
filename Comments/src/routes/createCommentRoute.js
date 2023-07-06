const express=require('express');
const createRouter=express.Router()
const{createComment,updateComment} = require('../controllers/createCommentContrller')

createRouter.post('/posts/:comment',  createComment )
createRouter.put('/posts/:update',  updateComment )


module.exports=  createRouter;


