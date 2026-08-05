const mongoose=require("mongoose")


const tokenSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    token:{
        type:String,
        required:true,
        unique:true 
    },
    expiresAt:{
        type:Date,
        required:true
    }
}
)
const Token=mongoose.model("token",tokenSchema)

module.exports=Token