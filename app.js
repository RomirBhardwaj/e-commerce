const express=require("express")
const commonRoutes=require('./routes/common.routes')


const app=express()
app.use(express.json())

app.use("/",commonRoutes)

module.exports=app