const nodemailer=require("nodemailer")
require("dotenv").config()

const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.gmail_name,
        pass:process.env.gmail_app_password 
    }
}
)

module.exports=transporter