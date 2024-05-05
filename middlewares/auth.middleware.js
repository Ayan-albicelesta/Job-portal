import jwt from 'jsonwebtoken';

const userAuth= async function(req,res,next){
  const authHeader=req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')){
           return next("Authentication failed")
  }
  const token=authHeader.split(' ')[1];
  try {
    const payload=jwt.verify(token,process.env.SECRET_KEY)//this will give the payload that was given while creating jwttoken
    req.user={userId:payload.userId};
    return next();
  } catch (error) {
    next("Authentication failed")
  }
}

export default userAuth;

