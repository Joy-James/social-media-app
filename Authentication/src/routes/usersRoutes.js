const express=require('express');
const router=express.Router()
const {Home,getAllUsers,getUserById, getUserByUsername, getUserFriendships}=require('../controllers/usersControllers')
router.get('/', Home )
router.get('/users', getAllUsers)
router.get ('/user/', getUserById)
router.get('/users/username',  getUserByUsername)
router.get('/users/friends',  getUserFriendships)


module.exports=router