const transporter=require("../config/nodemailer")

const mailSender= (to,subject,body)=>{
    const composeMail={
        from:"romirbhardwaj18@gmail.com",
        to:to,
        subject:subject,
        html:body
    }
    transporter.sendMail(composeMail)
}

module.exports=mailSender