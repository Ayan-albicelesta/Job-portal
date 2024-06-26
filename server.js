//dependencies import
import dotenv from 'dotenv';
dotenv.config();
 //dotenv.config({path:''}) --if .env file was created inside anither folder instead root folder we had to invoke path like here
import express from 'express';
const app=express();
import cors from 'cors';
import morgan from 'morgan';

//security packages
import helmet from 'helmet';
import ExpressMongoSanitize from 'express-mongo-sanitize';

//file import
import connectDB from './config/dbConnect.js';
import { errormiddleware } from './middlewares/error.middleware.js';

//route import
import authRouter from './routes/auth.router.js'
import testRouter from './routes/test.router.js';
import userRouter from './routes/user.router.js';
import jobRouter from './routes/jobs.router.js';

  

  const PORT= process.env.PORT ||8080;
  connectDB();


 //security middleware
app.use(helmet())//secures headers, helmed is a npm package that we installed, this is not inbuilt module
app.use((req, res, next) => {//this is inbuit module, that is used to prevent 'cross site scripting' as comapre to 'xss-clean' npm package
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});
app.use(ExpressMongoSanitize())//this miidlleware is used to prevnt mongo database attack(hack), hackers injets some script file to db, this npm packges tries to prevent the attack


 
//middlewares
app.use(express.json());
app.use(cors());//used for connecting frontend and backend
app.use(morgan('dev'));//prints a log that have information a about routrs, status code like metadata

//routes
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/test',testRouter);
app.use('/api/v1/user',userRouter)
app.use('/api/v1/job',jobRouter)

//validation middleware
app.use(errormiddleware)

app.listen(8080,()=>{
    console.log(`Node server is running in ${process.env.DEV_MODE} mode on port ${PORT}` );
})