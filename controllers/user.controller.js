 import User from "../models/user.model.js";

 export const updateUserController= async (req,res,next)=>{
    try {
        const{name,email,lastname,location}=req.body;
    if(!name || !email || !location){
        return next("All deatils are required to update");
    }
 
    const user=await User.findOne({_id:req.user.userId})//req.user.userId will be getting through auth middleware
    if(!user){
        return next("user not found")
    }
    user.name=name;
    user.email=email,
    user.location=location;

    await user.save(); 
    const token=user.createToken();

    console.log("user updated successfully");
    res.status(200).json({
        msg:"user updated successfully",
        user,
        token
    })

    } catch (error) {
        next(error)
    }
     
 }

 