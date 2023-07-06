const express=require('express');
const createRouter=express.Router()
const{createComment,updateComment,deleteComment} = require('../controllers/createCommentContrller')

createRouter.post('/posts/:comment',  createComment )
createRouter.put('/posts/:update',  updateComment )
createRouter.delete('/posts/:delete',  deleteComment )


module.exports=  createRouter;


