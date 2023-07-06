const express=require('express');
const createRouter=express.Router()
const{getCommentById} = require('../controllers/commentController')

createRouter.get('/posts/:commentId',  getCommentById )

module.exports=  createRouter;


