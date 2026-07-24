const express=require("express")
const accountRoutes=require('./routes/account.routes')
const errorHandler=require("./middlewares/error.middleware")
const app=express()
app.use(express.json())
app.use("/account", accountRoutes)
app.use(errorHandler)
module.exports=app