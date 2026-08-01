const joi = require('joi')

const signupSchema = joi.object({
    name: joi.string().required().min(3).max(30).trim(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    phone: joi.number().required().min(1000000000).max(9999999999),
    role:joi.string()
})

const loginSchema=joi.object({
    email:joi.string().email().required(),
    password:joi.when('loginViaOtp', {
        is: true,
        then: joi.string().optional(),
        otherwise: joi.string().min(6).required()
    }),
    loginViaOtp:joi.boolean().default(false),
    otp:joi.string().length(6).optional()
})

const verifyOtpSchema=joi.object({
    email:joi.string().email().required(),
    otp:joi.string().length(6).required()
})

module.exports = { signupSchema,loginSchema,verifyOtpSchema }