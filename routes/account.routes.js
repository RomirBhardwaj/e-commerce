const router=require('express').Router()
//middlewares
const inputValidate=require('../middlewares/input.validate')
const auth=require('../middlewares/auth')
const authvalidate=require('../middlewares/auth.validate')
// input schemas
const {signupSchema,loginSchema}=require('../validators/input.schemas')
//controllers
const {signup,login,getUser}=require('../controllers/account.controllers')




router.post('/signup', inputValidate(signupSchema), signup)
router.post('/login', inputValidate(loginSchema), login)    
router.get('/getuser',auth,getUser)

module.exports=router