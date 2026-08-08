const router=require("express").Router()
const auth=require("../middlewares/auth")
const rolevalidate=require("../middlewares/role.validate")
const {createAdmin,inviteModerator,acceptInvitation,completeInvitation}=require("../controllers/admin.contollers")


router.post("/createadmin",auth,rolevalidate(["super-admin"]),createAdmin)
router.post("/moderators/invite",auth,rolevalidate(["admin"]),inviteModerator);
router.get("/accept-invitation",acceptInvitation);
router.post("/complete-invitation",completeInvitation);
module.exports=router