import express from 'express';

import dotenv from 'dotenv';
import connectDB from './config/dbConnect.js';
dotenv.config() //dotenv.config({path:''}) --if .env file was created inside anither folder instead root folder we had to invoke path like here

const PORT= process.env.PORT || 8080;

//database connection
connectDB();
 

const app=express();

app.get('/',(req,res)=>{
    res.send('<h1>Welcome to My job portal</h1>');
})

app.listen(808,()=>{
    console.log(`Node server is running in ${process.env.DEV_MODE} mode on port ${process.env.PORT}` );
})