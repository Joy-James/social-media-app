const express=require('express');
const createRouter=express.Router()

const {createPost, updatePost}=require('../controllers/createPostsControllers')

createRouter.post('/create',  createPost)
createRouter.put('/update',   updatePost)


module.exports= createRouter;


