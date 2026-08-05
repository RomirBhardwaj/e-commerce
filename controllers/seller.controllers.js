const apiError=require("../utils/api.error.js")
const sellerModel=require("../models/seller.model")
const userModel=require('../models/user.model')



const apply=async(req,res,next)=>{
    try{
        const body=req.body;
        const exists=await userModel.findOne({_id:req.user._id})
        if(!exists)
            throw new apiError("User doesn't exist.",400)
        if(exists.role=="seller"){
            throw new apiError("User is already a seller.",400)
        }
        else{
            body.userId=req.user._id;
            const seller=await sellerModel.create(body);

            res.status(201).json({message:"Successfully applied to become a seller, wait to get verified.",seller:seller})
        
        }
    }catch(err){
        next(err)
    }
    
}
module.exports={apply}