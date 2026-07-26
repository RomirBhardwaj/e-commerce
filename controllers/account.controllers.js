const app=require('../app')
const userModel=require('../models/user.model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const errorHandler=require("../middlewares/error.middleware.js")
const apiError=require("../utils/api.error.js")

const mailSender=require("../utils/send.mail.js")

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

        mailSender(userData.email,"Welcome to our E-commerce website",`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login Successful</title>
</head>
<body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;background:#f5f7fb;">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">

          <!-- Header -->
          <tr>
            <td align="center" style="background:#2563eb;padding:35px;">
              <h1 style="margin:0;color:#ffffff;font-size:30px;">
                Login Successful
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h2 style="margin-top:0;color:#111827;">
                Hello User,
              </h2>

              <p style="font-size:16px;line-height:1.7;color:#4b5563;">
                This is a test email sent using <strong>Nodemailer</strong>.
              </p>

              <p style="font-size:16px;line-height:1.7;color:#4b5563;">
                Your account was logged in successfully. If this was you, no action is required.
              </p>

              <div style="text-align:center;margin:35px 0;">
                <a href="https://example.com"
                  style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:bold;">
                  Visit Website
                </a>
              </div>

              <p style="font-size:14px;color:#6b7280;">
                If you didn't perform this login, please change your password immediately.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background:#f9fafb;padding:25px;border-top:1px solid #e5e7eb;">
              <p style="margin:0;font-size:14px;color:#6b7280;">
                © 2026 Your Store. All rights reserved.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`)

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