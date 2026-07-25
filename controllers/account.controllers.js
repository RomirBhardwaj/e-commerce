const app=require('../app')
const userModel=require('../models/user.model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const errorHandler=require("../middlewares/error.middleware.js")
const apiError=require("../utils/api.error.js")

const signup = async(req,res,next)=>{
    const body=req.body;
    try{
        const user=await userModel.findOne({email:body.email}).select('+password')
    if(user){
        throw new apiError("user already exists, please login/sign-in.",400)
    }
    else{
        body.password=await bcrypt.hash(body.password,10)
        const userData=await userModel.create(body)
        res.status(201).json({message:"user created successfully",user:{id:userData._id,name:userData.name,email:userData.email,phone:userData.phone}})
    }
}catch(err){
    next(err)
}
} 

const login = async(req,res,next)=>{
    const body=req.body
    try{
        const userData=await userModel.findOne({email:body.email}).select('+password')
        if(userData){
            const verifyPassword=await bcrypt.compare(body.password,userData.password)  //returns either true or false
            if(verifyPassword){
                const token=jwt.sign({role:userData.role,Id:userData._id,email:userData.email,},process.env.SECRET_KEY,{expiresIn: "30d"})
                res.status(200).json({message:"Logged in successfully",user:{id:userData._id,name:userData.name,email:userData.email},token:token})
            }else{
                throw new apiError("Entered wrong password",401)
            } 
        }else{
            throw new apiError("User not found",401)
        }
    }catch(err){
        next(err)
    }
}

const getUser= async(req,res,next)=>{
    try{
        res.status(200).json({status:true,user:req.user})
    }catch(err){
        res.status(900).json({Mesage:"FU"})
    }
}


module.exports= { signup,login,getUser }