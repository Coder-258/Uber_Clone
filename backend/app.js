const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const cors=require('cors');
const app=express();
app.use(cors());
const connect_to_db=require('./db/db_Connection');
connect_to_db();
app.get("/",(req,res)=>{
    res.send("Hello");
})
module.exports=app