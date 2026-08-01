const crypto=require("crypto")
const bcrypt=require("bcrypt")
function otpGenerator(){
    const otp=crypto.randomInt(100000, 999999).toString();
    return otp;
}
module.exports=otpGenerator