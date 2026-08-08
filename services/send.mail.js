const transporter=require("../config/nodemailer")
const mailSender= async (to,subject,body)=>{
    const composeMail={
        from:process.env.gmail_name,
        to:to,
        subject:subject,
        html:body
    }
    return transporter.sendMail(composeMail)
}

module.exports=mailSender