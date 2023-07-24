const express=require('express');
const userRouter=express.Router()
const {postUser,loginUser}=require('../controllers/regestrationControllers')
const newUserMiddleware = require('../middlewares/newuserMiddlerware');

userRouter.post('/signup', newUserMiddleware, postUser)
 userRouter.post('/login',  loginUser)
module.exports= userRouter


