//error middleware
export const errormiddleware= (err,req,res,next)=>{
    console.log(err);
    res.status(500).send({
        succcess:false,
        msg:"something went wrong",
        err
    })
}