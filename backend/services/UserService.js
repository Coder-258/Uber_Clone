const userModel = require("../models/User_Model")

// to create a new user
module.exports.createUser=async({
firstName,lastName,email,password
})=>{
    if( !firstName || !email|| !password){
        throw new Error("All fields are required")
    }
    const user=userModel.create({
        fullName:{
            firstName,lastName
        },
        email,
        password
    })
    return user
}