const jwt=require("jsonwebtoken")
const userModel=require("../models/user.model")
const apiError=require("../utils/api.error")

const auth=async (req,res,next)=>{
try{
    const token = req.headers.authorization;
    if(!token){
        throw new apiError("No token provided", 401)
    }
    const verified = jwt.verify(token, process.env.SECRET_KEY)  // verify the token using the secret key returns payload if valid else throws error
    // const user=await userModel.findById(verified.Id)
        req.user = {_id:verified.Id,email:verified.email,role:verified.role}  // adding user details to req.user object for further use in routes;
        next()
    
}catch(err){
    next(err)
}
}

module.exports=auth