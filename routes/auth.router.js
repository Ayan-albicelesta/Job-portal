import express from "express";
import { resisterController , logincontroller} from "../controllers/auth.controller.js";

const authRouter=express.Router();




//routes
authRouter.post('/resgister',resisterController)
authRouter.post('/login',logincontroller)

export default authRouter;