const userModel=require('../models/user.model.js')
const tokenModel=require('../models/tokenmodel.js')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const apiError=require("../utils/api.error.js")
const crypto=require("crypto")
const mailSender=require("../services/send.mail.js")
const { signupEmail,otpEmail,resetPasswordEmail } = require('../utils/emailTemplates.js')
const otpGenerator=require("../utils/otpGenerator.js")




const signup = async(req,res,next)=>{
    const body=req.body;
    try{
        const user=await userModel.findOne({email:body.email})
    if(user){
        throw new apiError("user already exists, please login/sign-in.",400)
    }
    else{
        body.password=await bcrypt.hash(body.password,10)


        
        body.isVerified=false


        const userData=await userModel.create(body)

        const otp= otpGenerator()
        const hashedOtp=await bcrypt.hash(otp,10);

        const token=jwt.sign({id:userData._id,name:userData.name,email:userData.email,otp:hashedOtp,purpose:"email verification"},process.env.SECRET_KEY,{expiresIn:"10m"})
        
        
        mailSender(userData.email,"E-mail Verification",otpEmail(userData.name,"Email Verification",otp))
        res.status(201).json({message:"user created successfully. Verify your e-mail to login",user:{id:userData._id,name:userData.name,email:userData.email,isVerified:userData.isVerified},token:token})
        // mailSender(userData.email,"Welcome to our E-commerce website",signupEmail(userData.name))
    }
}catch(err){
    next(err)
}
} 

const login = async(req,res,next)=>{
    const body=req.body
    try{
        const userData=await userModel.findOne({email:body.email}).select('+password')
        if(!userData){
            throw new apiError("User not found",401)
        }
        if(userData.isVerified){
            const verifyPassword=await bcrypt.compare(body.password,userData.password)  //returns either true or false
            if(!verifyPassword){
                throw new apiError("Entered wrong password",401)
            }
            const token=jwt.sign({role:userData.role,Id:userData._id,email:userData.email,role:userData.role},process.env.SECRET_KEY,{expiresIn: "30d"})
            res.status(200).json({message:"Logged in successfully",user:{id:userData._id,name:userData.name,email:userData.email,role:userData.role},token:token}) 
        }else{
            const otp=otpGenerator()
            const hashedOtp=await bcrypt.hash(otp,10);
            token=jwt.sign({id:user._id,email:body.email,otp:hashedOtp,purpose:"email verification"},process.env.SECRET_KEY,{expiresIn:"10m"})
            mailSender(body.email,"E-mail Verification",otpEmail(userData.name,"Email Verification",otp))
            return res.status(200).json({status:true,message:"User can't login without E-mail verification, Verification OTP sent successfully to the provided Email",token:token})
        }
    }
    catch(err){
        next(err)
    }
}



const verifyOtp=async(req,res,next)=>{
    try{

        const token=req.headers.authorization
        const body=req.body
        
    const verified = jwt.verify(token, process.env.SECRET_KEY) 

    const user=await userModel.findOne({email:body.email})
    if(!user){
        throw new apiError("User not found",401)
    }
    const verifiedPassword=await bcrypt.compare(body.otp,verified.otp)
        if(!verifiedPassword){
            throw new apiError("User entered wrong OTP",401)
        }
        if(Date.now() >= verified.exp * 1000){
            throw new apiError("Otp expired, go to /resend-otp to resend the otp",401)
        }
        await userModel.findOneAndUpdate(
            { email: body.email },
            { isVerified: true }
        )
        return res.status(200).json({status:true,message:`${verified.purpose} successfully completed.`})
}catch(err){
    next(err)   
}
}







const resendOtp=async(req,res,next)=>{
    try{
    const {email,purpose}=req.body         //email and purpose
    const user=await userModel.findOne({email:email})
    if(!user){
        throw new apiError("Entered wrong E-mail",400);
    }
    const otp=otpGenerator()
    const hashedOtp=await bcrypt.hash(otp,10);

    if(purpose=="email verification"){
        token=jwt.sign({id:user._id,email:email,otp:hashedOtp,purpose:purpose},process.env.SECRET_KEY,{expiresIn:"10m"})
        mailSender(email,"E-mail verification Otp",otpEmail(user.name,"Email Verification",otp))
        return res.status(200).json({status:true,message:"Otp sent successfully to the provided Email",token:token})
    }

}catch(err){
    next(err)
}
}


const forgotpassoword=async(req,res,next)=>{
    const body=req.body
    try{
        const userData=await userModel.findOne({email:body.email})
        if(!userData){
            throw new apiError("User not found",401)
        }
        if(userData.isVerified){
            const previous_token=await tokenModel.findOneAndDelete({email:body.email});
            const randomstring = crypto.randomBytes(32).toString("hex");
            const resetPasswordUrl=`http://localhost:${process.env.port}/resetpassword?token=`+randomstring;
            const token=await tokenModel.create({userId:userData._id,email:body.email,token:randomstring,expiresAt:new Date(Date.now() + 15 * 60 * 1000)})
            mailSender(body.email,"Reset Password Link",resetPasswordEmail(body.email,"Reset password",resetPasswordUrl))
            res.status(200).json({message:"Reset Password Link Successfully sent to requested email",token:token}) 
        }else{
            const otp=otpGenerator()
            const hashedOtp=await bcrypt.hash(otp,10);
            token=jwt.sign({id:user._id,email:body.email,otp:hashedOtp,purpose:"email verification"},process.env.SECRET_KEY,{expiresIn:"10m"})
            mailSender(body.email,"E-mail Verification",otpEmail(userData.name,"Email Verification",otp))
            return res.status(200).json({status:true,message:"User can't login without E-mail verification, Verification OTP sent successfully to the provided Email",token:token})
        }


    }catch(err){
        next(err)
    }
}


const resetPassword=async(req,res,next)=>{
    try{

        const {newPassword,confirmPassword}=req.body;
        const token=req.query.token
        
        const storedToken=await tokenModel.findOne({"token":token})
        if(!storedToken){
            throw new apiError("Invalid token")
        }
        if (storedToken.expiresAt <= new Date()) {
        throw new apiError(
            "Token expired. Please request a new password reset link.",401);
        }
        if(newPassword!==confirmPassword){
            throw new apiError("Entered passwords are not matching")
        }
        const hashedNewPassword=await bcrypt.hash(newPassword,10);
        const user=userModel.findOneAndUpdate({email:storedToken.email},{password:hashedNewPassword})
        await tokenModel.findOneAndDelete({token:token})
        res.status(200).json({message:"Password reset successfully"})
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

module.exports= { signup,login,getUser,resendOtp,verifyOtp,forgotpassoword,resetPassword}