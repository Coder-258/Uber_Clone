const userModel = require('../models/User_Model');
const jwt = require('jsonwebtoken');
const blacklistToken = require('../models/blacklistToken');
const DriverModel=require('../models/DriverModel')
module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const isBlacklisted = await blacklistToken.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        return next();
    } catch {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports.authDriver = async (req, res, next) => {   
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    console.log(token)
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const isBlacklisted = await blacklistToken.findOne({ token });
    console.log("is token blacklisted",isBlacklisted)
    if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized" });
    }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded " , decoded)
        const driver = await DriverModel.findById(decoded._id);
        if(driver){
            req.driver = driver;
            console.log("driver found :" ,driver);
            return next();
        }else{
            console.log("driver is not found")
            return res.status(401).json({ message: "Unauthorized" });
        }
    
    // next();
};