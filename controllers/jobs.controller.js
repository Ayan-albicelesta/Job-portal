import Job from "../models/jobs.models.js"
import mongoose from "mongoose";
import moment from "moment";

export const createJob= async (req,res,next)=>{
    try {
        const {company,position}=req.body

        if(!company|| !position){
            return next("pls provide all required deatils")
        }
        req.body.createdBy=req.user.userId

        const job=await Job.create(req.body)//caompany,positon,createdBy is attached with req.body and all other will take default value
        return res.status(201).json({
            msg:"job opeing created",
            job
        })
    } catch (error) {
        return next(error);
    }
}

export const getAllJobs= async (req,res,next)=>{
    try {
        const jobs= await Job.find();
        return res.status(201).json({
        msg:"retrived all jobs",
        totaljob:jobs.length,
        jobs
    })
    } catch (error) {
        return next(error);
    }
     
}

export const updateJob=async(req,res,next)=>{
   try {
      const jobId=req.params.id;

      const {company,position}=req.body;
      if(!company || !position){
        return next("provide all deatails")
      }

      const job =await Job.findById({_id:jobId})
      //if no job found
      if(!job){
       return next("no job found with this id");
      }
      //if the both person are not same
      if(req.user.userId !=job.createdBy.toString()){
        return next("you are not authorized to update the job")
      }


      const updatedJob=await Job.findByIdAndUpdate({_id:jobId},req.body,{new :true,runValidators:true})//runValidators-->if their is extra info with req.body it will not update 

      res.status(201).json({
        msg:"job updated successfully",
        updatedJob
      })
   } catch (error) {
     return next(error)
   }
}


export const deleteJob= async (req,res,next)=>{
   const jobId=req.params.id;

   const job =await Job.findById({_id:jobId})
      //if no job found
      if(!job){
       return next("no job found with this id");
      }
      //if the both person are not same
      if(req.user.userId !=job.createdBy.toString()){
        return next("you are not authorized to update the job")
      }

      //deleting the job
      const deletedJob=await job.deleteOne();

      return res.status(200).json({
        msg:"job is not available",
        deletedJob
      })
}


export const jobStats = async (req,res)=>{
   const stats=await Job.aggregate([
     //search by user job
     {
      $match:{
        createdBy: new mongoose.Types.ObjectId(req.user.userId)
      }
     },
     {
      $group:{
        _id:'$status',
        count:{
           $sum:1
        }
      }
     }
   ])
 
   let monthlyApplication = await Job.aggregate([
    {
      $match:{
        createdBy: new mongoose.Types.ObjectId(req.user.userId)
      }
    },
    {
      $group:{
        _id:{
          year:{$year: '$createdAt'},
          month:{$month:'$createdAt'}
        },
        count:{
          $sum:1
        }
      }
    }
   ])

   monthlyApplication=monthlyApplication.map((item)=>{
     const {_id:{year,month},count}=item;//destrrucring the object and inner object also
     const date=moment().month(month-1).year(year).format("MMM Y");
     return{date,count};
   }).reverse()

   res.status(200).json({
      totaljob:stats.length,
      stats,
      totalApplicationBasedOnMonth:monthlyApplication.length,
      monthlyApplication
   })
}