//dependencies import
import dotenv from 'dotenv';
dotenv.config();
 //dotenv.config({path:''}) --if .env file was created inside anither folder instead root folder we had to invoke path like here
import express from 'express';
const app=express();
import cors from 'cors';
import morgan from 'morgan';


//file import
import connectDB from './config/dbConnect.js';

  

  const PORT= process.env.PORT ||8080;
  connectDB();


 
//middlewares
app.use(express.json());
app.use(cors());//used for connecting frontend and backend
app.use(morgan('dev'));//prints a log that have information a about routrs, status code like metadata

app.listen(8080,()=>{
    console.log(`Node server is running in ${process.env.DEV_MODE} mode on port ${PORT}` );
})