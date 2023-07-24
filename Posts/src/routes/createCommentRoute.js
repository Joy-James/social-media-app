const express=require('express');
const commentRouter=express.Router()
const{createComment,updateComment,deleteComment,getCommentById,getCommentsForPost} = require('../controllers/createCommentContrller')

commentRouter.post('/posts/:comment',  createComment )
commentRouter.put('/posts/:update',  updateComment )
commentRouter.delete('/posts/post/:delete',  deleteComment )
commentRouter.get('/posts/comment/:commentId',  getCommentById )
commentRouter.get('/posts/comment/post/:post_id',  getCommentsForPost )


module.exports=  commentRouter;


