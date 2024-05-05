import express from 'express';
import { testPostController } from '../controllers/test.controller.js';
import userAuth from '../middlewares/auth.middleware.js';

const testRouter=express.Router();

testRouter.post('/test-post',userAuth, testPostController)

export default testRouter