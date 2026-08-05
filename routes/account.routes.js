const router=require('express').Router()
//middlewares
const inputValidate=require('../middlewares/input.validate')
const auth=require('../middlewares/auth')
const authvalidate=require('../middlewares/role.validate')
// input schemas
const {signupSchema,loginSchema}=require('../validators/input.schemas')
//controllers
const {signup,login,getUser,resendOtp,verifyOtp,forgotpassoword,resetPassword}=require('../controllers/account.controllers')




router.post('/signup', inputValidate(signupSchema), signup)
router.post('/login', login)    
router.get('/getuser',auth,getUser)
router.post('/resendotp',resendOtp)
router.post('/verifyotp',verifyOtp)
router.post('/forgotpassword',forgotpassoword)
router.post('/resetpassword',resetPassword)

module.exports=router