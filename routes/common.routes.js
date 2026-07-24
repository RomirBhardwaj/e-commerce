const router=require('express').Router()
const {signup}=require('../controllers/common.controllers')
const auth=require('../middlewares/auth')
const validate=require('../middlewares/validate')
router.post('/signup',signup)

module.exports=router