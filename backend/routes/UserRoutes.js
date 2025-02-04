const express=require('express');
const router=express.Router();
const {body}=require('express-validator');
const userController=require('../controllers/UserController')
router.post("/register",[
    body('email').isEmail().withMessage("Inavlid Email"),
    body('fullName.firstName').isLength({min:3}).withMessage("First Name should be atleast 3 characters long"),
    body('password').isLength({min:6}).withMessage("Password must be atleast 6 characters long")
],
    userController.registerUser
)


module.exports=router;