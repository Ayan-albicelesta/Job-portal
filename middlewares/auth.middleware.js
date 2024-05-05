import jwt from 'jsonwebtoken';

const userAuth= async function(req,res,next){
  const authHeader=req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')){
           return next("Authentication failed")
  }
  const token=authHeader.split(' ')[1];//we are taking the second string by as the first parameter is 'Bearer' 
  try {
    const payload=jwt.verify(token,process.env.SECRET_KEY)//this will give the payload that was given while creating jwttoken
    req.user={userId:payload.userId};//seting req.user and will be passed to next function for some kind of authentication
    return next();
  } catch (error) {
    next("Authentication failed")
  }
}

export default userAuth;
