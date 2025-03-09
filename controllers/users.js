const User= require("../models/user")
//Signup Form
module.exports.renderSignupForm= (req, res)=> {
    // res.send("form");
    res.render("users/signup.ejs");
}

//Signup User
module.exports.signup= async(req, res)=>{
    try{
        let{username, email, password}= req.body;
        const newUser= new User({email, username});
        const registeredUser= await User.register(newUser, password);
        console.log(registeredUser);
        //auto login after signup
        req.login(registeredUser, (err) =>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to WanderLust");
            res.redirect("/listings");
        });   
    }
    catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

//login form
module.exports.renderLoginForm= (req, res)=> {
    // res.send("form");
    res.render("users/login.ejs");
}

//Login User
module.exports.login= async(req, res)=> {
    req.flash("success", "Welcome to WanderLust! You are logged in..");
    //post login page
    let redirectUrl= res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
}

//Logout User
module.exports.logout= (req, res, next) =>{
    req.logout((err) =>{
        if(err){
            return next(err);
        }
        req.flash("success", "Logged out!");
        res.redirect("/listings");
    });  
}