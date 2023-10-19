const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller")
const passport = require("passport");

router.get("/sign-up",userController.signUp);
router.get("/sign-in",userController.signIn);
router.get("/reset",userController.reset);

router.post("/create",userController.create);

//use passport to authenticate
router.post("/create-session",passport.authenticate("local",{failureRedirect:"/users/sign-in"}),userController.createSession);

router.get("/sign-out", userController.destroySession) // sign-out router

router.post("/update-password",userController.updatePassword);

// Google oauth2 authentication
router.get("/auth/google", passport.authenticate("google",{scope:["profile","email"]}));
router.get("/auth/google/callback", passport.authenticate("google",{failureRedirect:"/users/sign-in"}), userController.createSession);

module.exports = router 