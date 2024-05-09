import express from "express";
import { resisterController , logincontroller} from "../controllers/auth.controller.js"


// ***************VVI********-->"express-rate-limit" is used only in  this file that means the rate limiting attributes only work for this file
//where this is used, if "express-rate-limit" was used inside server.js, this middleware would have been applied for whole project
import { rateLimit } from 'express-rate-limit';//this is ratelimit npm module
//confoguring the rateLimit
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

const authRouter=express.Router();




//routes
authRouter.post('/resgister',limiter,resisterController)//here limiter middleware is used that is inbuilt module to limit certain fields like request, acesss time
authRouter.post('/login',limiter,logincontroller)

export default authRouter;