const router=require('express').Router()
//middlewares
// const inputValidate=require('../middlewares/input.validate')
const auth=require('../middlewares/auth')
// const authvalidate=require('../middlewares/auth.validate')
// input schemas
// const {signupSchema,loginSchema}=require('../validators/input.schemas')
//controllers
const {apply}=require('../controllers/seller.controllers')




router.post('/apply', auth, apply)
// router.post('/signup', inputValidate(signupSchema), signup)
// router.post('/login', login)    
// router.get('/getuser',auth,getUser)
// router.post('/resendotp',resendOtp)
// router.post('/verifyotp',verifyOtp)
// router.post('/forgotpassword',forgotpassoword)
// router.post('/resetpassword',resetPassword)

module.exports=router