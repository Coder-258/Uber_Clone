const express=require('express');
const router=express.Router();
const {body}=require('express-validator');
const userController=require('../controllers/UserController')
const authMiddleware=require('../middlewares/AuthMiddlewares');
const { route } = require('../app');

router.post("/register",[
    body('email').isEmail().withMessage("Inavlid Email"),
    body('fullName.firstName').isLength({min:3}).withMessage("First Name should be atleast 3 characters long"),
    body('password').isLength({min:6}).withMessage("Password must be atleast 6 characters long")
],
    userController.registerUser
)
router.post("/login",[
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min:6}).withMessage("Password must be atleast 6 characters long")
],
    userController.loginUser
)

router.get("/profile",authMiddleware.authUser,userController.getUserProfile);
router.get("/logout",authMiddleware.authUser,userController.logoutUser);

module.exports=router;