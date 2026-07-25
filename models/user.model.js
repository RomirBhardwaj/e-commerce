const mongoose=require("mongoose")


const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:3,
        maxLength:30
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:6,
        select: false 
    },
    phone:{
        type:Number,
        required:true,
        min:1000000000,
        max:9999999999
    },
    addresses: [{
    fullName: String,
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: { type: String, default: 'India' }
  }],
  role:{
    type:String,
    enum:["user","admin"],
    default:"user"
  }
}
)
const User=mongoose.model("User",userSchema)

module.exports=User 
