const mongoose=require("mongoose")
const app=require("./app")
require("dotenv").config()


mongoose.connect(process.env.connection_string).then(()=>{
    console.log("Mongo DB connected successfully.")}).catch((err)=>
        {console.log("Error occured",err)})




app.listen(process.env.port,()=>{console.log(`Server is running at port ${process.env.port}`)})


