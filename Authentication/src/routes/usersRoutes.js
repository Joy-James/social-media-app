const express=require('express');
const router=express.Router()
const {Home,getAllUsers,getUserById, getUserByUsername}=require('../controllers/usersControllers')
router.get('/', Home )
router.get('/users', getAllUsers)
router.get ('/users/:UserprofileID', getUserById)
router.get('/users/username',  getUserByUsername)

module.exports=router