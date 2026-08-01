const router=require('express').Router()
//middlewares
const inputValidate=require('../middlewares/input.validate')
const auth=require('../middlewares/auth')
const authvalidate=require('../middlewares/auth.validate')
// input schemas
const {signupSchema,loginSchema,verifyOtpSchema}=require('../validators/input.schemas')
//controllers
const {signup,login,getUser,verifyOtp,verifyotp}=require('../controllers/account.controllers')



router.post('/signup', inputValidate(signupSchema), signup)
router.post('/login', inputValidate(loginSchema), login)
// router.post('/verify-otp', inputValidate(verifyOtpSchema), verifyotp)
router.post('/verify-otp', inputValidate(verifyOtpSchema), verifyOtp)
router.get('/getuser',auth,getUser)

module.exports=router