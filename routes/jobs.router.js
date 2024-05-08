import express from 'express';
import userAuth from '../middlewares/auth.middleware.js';
import { createJob,getAllJobs,updateJob,deleteJob,jobStats} from '../controllers/jobs.controller.js';

const jobRouter=express.Router();

//create job
jobRouter.post('/create-job',userAuth,createJob);

//get job
jobRouter.get('/get-job',userAuth,getAllJobs)

//update job
jobRouter.patch('/update-job/:id',userAuth,updateJob)

//deletejob
jobRouter.delete('/delete-job/:id',userAuth,deleteJob)

//Jobs stats and filter
jobRouter.get('/job-stats',userAuth,jobStats)
 
export default jobRouter;