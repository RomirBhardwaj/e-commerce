const express=require("express")
const accountRoutes=require('./routes/account.routes')
const sellerRoutes=require('./routes/seller.routes')
const adminRoutes=require('./routes/admin.routes')
const errorHandler=require("./middlewares/error.middleware")
 
const app=express()
const cors = require('cors')


cors('http://localhost:3002')
app.use(express.json())
app.use("/account", accountRoutes)
app.use("/seller", sellerRoutes)
app.use("/admin", adminRoutes)

// app.get('/users', (req,res)=>{
//     console.log('In get users')
//     res.json({
//         success: true,
//         message: "Fetched the API successfully"
//     })
// })
app.use(errorHandler)
module.exports=app