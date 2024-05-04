import mongoose from "mongoose";

async function connectDB(){
     try {
         const connection= await mongoose.connect(process.env.DB_URL)
         console.log(`DB connected ${mongoose.connection.host}`);
     } catch (error) {
        console.log("DB connection error ",error);
     }
}
 
export default connectDB;

