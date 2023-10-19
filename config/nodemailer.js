const nodemailer = require("nodemailer")
require("dotenv").config();
const ejs = require("ejs");
const path = require("path");

const transporter = nodemailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:process.env.SENDER_EMAIL,
        pass:process.env.EMAIL_KEY
    }
})

let renderTemplate = (data, relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, "../views/mailers", relativePath),
        data,
        function(err, template){
            if(err){console.log("error in rendering template",err); return;}
            mailHTML = template
        }        
    )
    return mailHTML;
}

module.exports = {
    transporter:transporter,
    renderTemplate : renderTemplate
}