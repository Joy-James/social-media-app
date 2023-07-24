const express=require('express');
const postRouter=express.Router()
const {getAllPosts,getPostById, getSpecificUserPosts,createPost, updatePost, deletePost}=require('../controllers/postControllers')

postRouter.get('/posts',  getAllPosts)
postRouter.get('/posts/post_id',  getPostById)
postRouter.get('/posts/Usersposts',  getSpecificUserPosts)
postRouter.post('/posts/create',  createPost)
postRouter.put('/posts/update',   updatePost)
postRouter.delete('/posts/delete/:post_id',   deletePost)
module.exports= postRouter