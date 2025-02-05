const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const cors=require('cors');
const connect_to_db=require('./db/db_Connection');
const userRoutes=require('./routes/UserRoutes');
const cookieParser=require('cookie-parser');
const app=express();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

connect_to_db();
app.get("/",(req,res)=>{
    res.send("Hello");
})
app.use('/users',userRoutes);


module.exports=app