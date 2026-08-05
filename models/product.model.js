const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    name:{
        type:String,
        maxLength:300,
        minLength:6,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    priceHistory:[{
       price:{
        type:Number,
        default:0
       },
       changedAt:{
        type:Date,default:Date.now
       }
    }],
    categories:[{
        type:string,
        required:true
    }],
    avgRatings:{
        type:Number,
        default:0
    },
    totalRatings:{
        type:Number,
        default:0
        
    }

},{timestamps:true})

const product=mongoose.model(Product,productSchema)

mongoose.exports=product