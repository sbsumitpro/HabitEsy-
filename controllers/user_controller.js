const User = require("../models/user");
const bcrypt = require("bcryptjs");
const signUpGreetMailer = require("../mailer/sign_up_mailer");
const fetch = require("node-fetch");

module.exports.signUp = (req, res)=>{
    return res.render("sign-up",{
        title:"User Sign Up"
    })
}

module.exports.signIn = (req,res)=>{
    return res.render("sign-in",{
        title:"User Sign In"
    })
}

module.exports.reset = (req,res)=>{
    return res.render("reset",{
        title:"Password Reset"
    })
}

module.exports.create = async (req,res)=>{
    try{
        if(req.body.password!=req.body.confirm_password){
            req.flash("error","Your password and confirm password doesn't match!")
            console.log("Password doesn't match!")
            return res.redirect("back");
        }
        let user = await User.findOne({email:req.body.email});
    
        if(!user){
            // hashing the password before saving it to the DB
            const salt = await bcrypt.genSalt(10);
            secPass = await bcrypt.hash(req.body.password,salt)
            await User.create({
                name:req.body.name,
                email: req.body.email,
                password:secPass
            })

            // sending an email after successful sign up to his registered email id.
            let htmlMsg = `Hi ${req.body.name}. Congratulations as you have successfully created your accunt with us!`
            signUpGreetMailer.signUpGreeting(htmlMsg, req.body.email)
            req.flash("success","Signed up successfully, Please check your email")
            console.log("User created successfully");
            res.redirect("/users/sign-in")
        }else{
            console.log("User with this email id already exists!");
            return res.redirect("back")
        }
    }catch(error){
        console.log("Error while creating a new user", error);
        return;
    }
}

module.exports.createSession =async(req,res)=>{

    // This part of the code takes care of the recaptcha on the serverside
    const captchaVerified = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=6Lfyp0koAAAAANpyc6a55I5vdhqj-fB5m321AkJq&response=${req.body["g-recaptcha-response"]}`,{
        method:"POST"
    })
    .then(res=>res.json())
    // console.log(captchaVerified.success)
    console.log("----",req.route.path)
    //If the captcha matches, then only allow the user to sign in else redirect
    if(captchaVerified.success===true || req.route.path=="/auth/google/callback"){
        req.flash("success","Signed in Successfully")
        return res.redirect("/");
    }else{
        req.flash("error","Please click on the checkbox")
        return res.redirect("back");
    }
}

module.exports.destroySession  =(req,res)=>{
    req.logout((err)=>{
        if(err){
            console.log("Error in logging out", err);
            return;
        }
        req.flash("success","Signed out!")
        // console.log("Logged out");
        return res.redirect("/");
    })
}

module.exports.updatePassword =async(req,res)=>{
    try{
        let user = await User.findById(req.query.id)
        let isMatched = await bcrypt.compare(req.body.old_password, user.password)
        if(isMatched){
            if(req.body.new_password != req.body.confirm_new_password){
                req.flash("error","New Password and confirm new password doesn't match!")
                // console.log("New Password and confirm new password doesn't match!");
                return res.redirect("back")
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.new_password,salt)
            await User.findByIdAndUpdate(user._id,{password:secPass})
            
            req.flash("success","Password updated successfully!")
            return res.redirect("/")
        }else{
            req.flash("error","Youe old password is not correct")
            // console.log("You old passwor is not correct")
            return res.redirect("back");
        }
        
        return res.redirect("/");
    }catch(err){
        console.log("Error in Finding the user");
        return res.redirect("back")
    }

}