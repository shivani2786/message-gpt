const express= require ('express')
const { registerController } = require('../controllers/authController')
const { loginController } = require('../controllers/authController')
const { logoutController } = require('../controllers/authController')

//router object
const router=express.Router()
//routes
//register
router.post('/register',registerController)
//login
router.post('/login',loginController)
//logout
router.post('/logout',logoutController)

module.exports=router