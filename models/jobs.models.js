import mongoose from "mongoose";

const jobSchema=new mongoose.Schema({
     company:{
        type:String,
        required:[true,"company name is required"]
     },
     position:{
        type:String,
        required:[true,"job position is required"]  
     },
     status:{
        type:String,
        enum:["pending","rejected","interview"],
        default:"pending"
     },
     workType:{
        type:String,
        enum:["fulltime","parttime","intern",'contarct'],
        default:"fulltime"
     },
     workLocation:{
        type:String,
        require:[true,"work location is required"],
        default:"india"
     },
     createdBy:{
        type: mongoose.Types.ObjectId,
        ref:"User"
     }
},{timestamps:true})

const Job=mongoose.model('Job',jobSchema)

export default Job;
