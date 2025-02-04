
const userModel=require('../models/User_Model')
const userService=require('../services/UserService')
const {validationResult}=require('express-validator');

// logic to register a new user
module.exports.registerUser=async (req,res,next)=>{
  // check if any of the required field has an error or not
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }
  // create a new user
  const {firstName,lastName,email,password}=req.body;
  const hashedPassword= await userModel.hashPassword(password);
  const user= await userService.createUser({
    firstName,
    lastName,
     email,
    password:hashedPassword
  })
  // generate a jwt token for verification and authentication
  const token=user.generateAuthToken()
  res.statud(201).json({token,user})
}