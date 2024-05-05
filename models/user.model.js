import  mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const userSchema=new mongoose.Schema({
     name:{
        type:String,
        required:[true,"name is required"]
     },
      lastName:{
         type:String
      },
     email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email have to be unique"],
        validate:validator.isEmail
     },
     password:{
      type:String,
      required:[true,"password is required"],
      minlength:[6,'password length should be greater than 6']
     },
     location:{
      type:String,
      default:"India"
     }
},{timestamps:true})

//hash password
userSchema.pre('save',async function(){
     const salt=await bcrypt.genSalt(10);
     this.password=await bcrypt.hash(this.password,salt)
})
//compare password
userSchema.methods.comparePassword= async function(password){
   const checkPassword=await bcrypt.compare(password,this.password);
   return checkPassword;
}

userSchema.methods.createToken= function(email){
    const token=jwt.sign({userId:this._id,email},process.env.SECRET_KEY,{expiresIn:'1h'});
    return token;
}


const User=mongoose.model('User',userSchema)

export default User;