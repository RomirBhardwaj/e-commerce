const userModel=require('../models/user.model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const apiError=require("../utils/api.error.js")

const mailSender=require("../utils/send.mail.js")
const { signupEmail,otpEmail } = require('../utils/emailTemplates.js')
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

        if(body.loginViaOtp){
            const otpCode=Math.floor(100000 + Math.random() * 900000).toString()
            const otpHash=await bcrypt.hash(otpCode,10)

            await mailSender(userData.email,"Your OTP for login",otpEmail(otpCode))
          
            const otpToken=jwt.sign({
                email:userData.email,
                otp:otpHash,
                purpose:'otp-login'
            }, process.env.SECRET_KEY, { expiresIn: '10m' })

            return res.status(200).json({
                message:"OTP sent to your email",
                user:{id:userData._id,name:userData.name,email:userData.email},
                otpToken
            })
        }

        const verifyPassword=await bcrypt.compare(body.password,userData.password)
        if(verifyPassword){
            const token=jwt.sign({role:userData.role,Id:userData._id,email:userData.email,},process.env.SECRET_KEY,{expiresIn: "30d"})
            return res.status(200).json({message:"Logged in successfully",user:{id:userData._id,name:userData.name,email:userData.email},token:token})
        }

        throw new apiError("Entered wrong password",401)
    }catch(err){
        next(err)
    }
}

const verifyotp = async(req,res,next)=>{
    const body=req.body
    try{
        const token = req.headers.authorization
        if(!token){
            throw new apiError("OTP token missing",401)
        }

        const decoded=jwt.verify(token, process.env.SECRET_KEY)
        if(decoded.purpose !== 'otp-login'){
            throw new apiError("Invalid OTP token",401)
        }

        const verifyOtpCode=await bcrypt.compare(body.otp, decoded.otpHash)
        if(!verifyOtpCode){
            throw new apiError("Invalid OTP",401)
        }

        const userData=await userModel.findOne({email:decoded.email})
        if(!userData){
            throw new apiError("User not found",401)
        }

        const loginToken=jwt.sign({role:userData.role,Id:userData._id,email:userData.email,},process.env.SECRET_KEY,{expiresIn: "30d"})
        return res.status(200).json({message:"OTP verified successfully",user:{id:userData._id,name:userData.name,email:userData.email},token:loginToken})
    }catch(err){
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


const getUser= async(req ,res,next)=>{
    try{
        res.status(200).json({status:true,user:req.user})
    }catch(err){
        res.status(900).json({Mesage:"FU"})
    }
}


module.exports= { signup,login,getUser,verifyotp,verifyOtp }