const router=require("express").Router()
const auth=require("../middlewares/auth")
const rolevalidate=require("../middlewares/role.validate")
const {verifySellerReq}=require("../controllers/moderator.controller")


router.post("/verify-seller",auth,rolevalidate(["moderator"]),verifySellerReq)
module.exports=router