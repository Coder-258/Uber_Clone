const express=require('express');
const router=express.Router();
const validator=require('express-validator');
const userController=require('../controllers/UserController')
router.post("/register",[
    validator('email'.isEmail()).withMessage("Inavlid Email"),
    validator('fullname.firstName').isLength({min:3}).withMessage("First Name should be atleast 3 characters long"),
    validator('password').isLength({min:6}).withMessage("Password must be atleast 6 characters long")
],
    userController.registerUser
)


module.exports=router;