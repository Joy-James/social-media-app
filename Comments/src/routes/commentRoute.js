const express=require('express');
const commentRouter=express.Router()
const{getCommentById} = require('../controllers/commentController')

commentRouter.get('/posts/:commentId',  getCommentById )

module.exports=  commentRouter;


