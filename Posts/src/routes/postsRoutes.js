const express=require('express');
const postRouter=express.Router()
const {getAllPosts,getPostById}=require('../controllers/postControllers')

postRouter.get('/posts',  getAllPosts)
postRouter.get('/posts/:post_id',  getPostById)
module.exports= postRouter


