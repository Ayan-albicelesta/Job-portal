import express from 'express'
import userAuth from '../middlewares/auth.middleware.js'
import {updateUserController} from '../controllers/user.controller.js'

const userRouter=express.Router();

//first mathch jwt by userAuth, if matched it will give payload, that will consist userId, now send that userId through auth middleware, and with that userId
//find valid user in updateUserController, if user found then let him update his profile
userRouter.put('/update-user',userAuth,updateUserController)

export default userRouter;