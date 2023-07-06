const express=require('express');
const createRouter=express.Router()

const {createPost, updatePost, deletePost}=require('../controllers/createPostsControllers')

createRouter.post('/create',  createPost)
createRouter.put('/update',   updatePost)
createRouter.delete('/delete',   deletePost)


module.exports= createRouter;


