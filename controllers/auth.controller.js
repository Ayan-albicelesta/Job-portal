import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';

export const resisterController= async (req,res,next)=>{
    try {
        const{name,email,password}=req.body;
        //validate
        if(!name ||!email || !password){
            return next("provide all details")
             
        }
        //cheack if user already created
        const existinguser= await User.findOne({email});
        console.log(1);
        if(existinguser){
            return  next("user already created")
        }
        //creating new user
        const user=await User.create({name,email,password});
    
        res.status(201).send({
            msg:"user created",
            success:true,
            user,
        })
         
    } catch (error) {
        return  next(error) 
    }
}


export async function logincontroller(req,res,next){
    const {email,password}=req.body;
    try {
        console.log(0);
        if(!email || !password){
            console.log(1);
            return next("provide all fields")
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                msg:"user not found"
            })
        }
        //check for valid password
        const checkValidpassword=user.comparePassword(password);
        if(!checkValidpassword){
            return res.status(400).json({
                msg:"Enter valid password"
            })
        }
        //if valid password create jwt
        const token=user.createToken(email);
        user.password=undefined;//this will only affect the clint side, password will not be visible to clint as it is undefined, though in DB password is there
        console.log('logged in succesfully');
        return res.status(201).json({
            msg:"user logged in successfully",
            user,
            token
        })
        
    } catch (error) {
        console.log(3);
        return next(error)
    }
}