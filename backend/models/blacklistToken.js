// it is tricky to create a logout route using jwt. So we will use a blacklist token approach to logout the user. We will create a new model called blacklistToken.js and create a new route to logout the user. We will also create a middleware to check if the token is blacklisted or not. If the token is blacklisted then the user will not be able to access the protected routes. If the token is not blacklisted then the user will be able to access the protected routes. Moreover, we will bring a TTL(time to live) to the token. So the token will be deleted from the database after a certain time to free up the space from our db.

const mongoose=require('mongoose');
const blacklistTokenSchema=new mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:86400 // 24 hours in seconds
    }
})
module.exports=mongoose.model('blacklistToken',blacklistTokenSchema);