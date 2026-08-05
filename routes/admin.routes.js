const router=require("express").Router()
const auth=require("../middlewares/auth")
const rolevalidate=require("../middlewares/role.validate")
const {createAdmin}=require("../controllers/admin.contollers")


router.post("/createadmin",auth,rolevalidate(["super-admin"]),createAdmin)

module.exports=router