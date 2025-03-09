//Sign Up User 

const express= require("express");
const router= express.Router();
const User= require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport= require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController= require("../controllers/users.js");// code goes here

router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup));


router.route("/login")
.get(userController.renderLoginForm)
.post(
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect: "/login",
        failureFlash: true,
    }),
    userController.login
);


//logut User
router.get("/logout", userController.logout);


module.exports= router;



// SignUp
// router.get("/signup", userController.renderSignupForm);
// router.post("/signup", wrapAsync(userController.signup));

//Login User
// router.get("/login", userController.renderLoginForm);

// router.post(
//     "/login",
//     saveRedirectUrl,
//     passport.authenticate("local",{
//         failureRedirect: "/login",
//         failureFlash: true,
//     }),
//     userController.login
// );