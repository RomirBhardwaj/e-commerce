const userModel=require("../models/user.model")
const bcrypt=require("bcrypt")
const apiError=require("../utils/api.error")



    
const createAdmin=async(req,res,next)=>{
    const admin_data=req.body
    try{
        const exists= await userModel.findOne({email:admin_data.email})
        if(!exists){
            admin_data.password=await bcrypt.hash(admin_data.password,10)
            const admin=await userModel.create({name:admin_data.name,email:admin_data.email,password:admin_data.password,phone:admin_data.phone,role:"admin",isVerified:true})
            res.status(200).json({message:"Admin created successfully",admin:{id:admin._id,name:admin.name,email:admin.email,phone:admin.phone}})
        }else{
            throw new apiError("Admin already exists, please login/sign-in.",400)
        }
    }catch(err){
        next(err)
    }
}

module.exports={createAdmin}