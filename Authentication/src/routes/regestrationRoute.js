const express=require('express');
const userRouter=express.Router()
const {postUser,loginUser}=require('../controllers/regestrationControllers')

userRouter.post('/signup',  postUser)
 userRouter.post('/login',  loginUser)
module.exports= userRouter


