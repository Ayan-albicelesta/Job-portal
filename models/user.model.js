import  mongoose from 'mongoose';
import validator from 'validator';


const userSchema=new mongoose.Schema({
     name:{
        type:"String",
        required:[true,"name is required"]
     },
      lastName:{
         type:String
      },
     email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email have to be unique"]
     },
     password:{
      type:String,
      required:[true,"password is required"],
      validate:validator.isEmail()
     },
     location:{
      type:String,
      default:"India"
     }
},{timestamps:true})


const User=mongoose.model('User',userSchema)

export default User;