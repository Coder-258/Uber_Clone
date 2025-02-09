const userModel=require('../models/User_Model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const blacklistToken=require('../models/blacklistToken');
// this is used to find whether the user is authenticated or not by finding the ddecoded token and then finding the user by the id provided in the token
module.exports.authUser=async (req,res,next)=>{
    const token=req.cookies.token|| req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    };
    const isBlacklisted=await blacklistToken.findOne({token});
    if(isBlacklisted){
        return res.status(401).json({message:"Unauthorized"});
    }
    try{
        // this is used to decode the token and get the user id from it because we provided the user id while creating the token in the model schema
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await userModel.findById(decoded._id);
        req.user=user;
        return next();

    }catch{
        return res.status(401).json({message:"Unauthorized"});
    }

};