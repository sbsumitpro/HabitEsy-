const nodeMailer = require("../config/nodemailer");
require("dotenv").config();

exports.signUpGreeting= (SignUpMsg, email)=>{
    // console.log("Inside nodemailer", comment);

    nodeMailer.transporter.sendMail({
        from:process.env.SENDER_EMAIL,
        to:email,
        subject:"Sign-up successful!",
        html: SignUpMsg
    },(err,info)=>{
        if(err){
            console.log("Error in sending email", err);
            return;
        }
        console.log("Sign-up greeting msg Sent!");
        return;

    })
}