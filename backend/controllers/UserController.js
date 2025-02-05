
const userModel=require('../models/User_Model')
const userService=require('../services/UserService')
const {validationResult}=require('express-validator');
const blacklistToken=require('../models/blacklistToken');

// logic to register a new user
module.exports.registerUser=async (req,res,next)=>{
  // check if any of the required field has an error or not
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }
  // create a new user
  const {fullName,email,password}=req.body;
  const hashedPassword= await userModel.hashPassword(password);
  const user= await userService.createUser({
    firstName:fullName.firstName,
    lastName:fullName.lastName,
     email,
    password:hashedPassword
  })
  // generate a jwt token for verification and authentication
  const token=user.generateAuthToken()
  res.status(201).json({token,user})
}

// for user login
module.exports.loginUser=async (req,res,next)=>{
  // check if any of the required field has an error or not
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }
  // check if the user exists or not
  const {email,password}=req.body;

  // .select('+password') is used to select the password field as it is set to select:false in the model schema . this is used to make sure that the password is selected when we want to compare it with the password entered by the user
  const user=await userModel.findOne({email}).select('+password');
  if(!user){
    return res.status(401).json({message:"Invalid Email or Password"})
  }
  const isMatch=await user.comparePassword(password);
  if(!isMatch){
    return res.status(401).json({message:"Invalid Email or Password"})
  }
  const token=user.generateAuthToken();
  res.cookie('token',token);
  res.status(200).json({token,user});
}


// get user profile
module.exports.getUserProfile=async (req,res,next)=>{
  const user=await userModel.findById(req.user._id);
  res.status(200).json(user);
}

// logout user
module.exports.logoutUser=async (req,res,next)=>{
  res.clearCookie('token');
  const token=req.cookies.token||req.headers.authorization.split(' ')[1];
  await blacklistToken.create({token});
  res.status(200).json({message:"Logged Out Successfully"});
}