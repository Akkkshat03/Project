if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const Listing= require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");  //for layout
// const wrapAsync= require("./utils/wrapAsync.js");
const ExpressError= require("./utils/ExpressError.js");
const session= require("express-session");
const MongoStore= require("connect-mongo");
const flash= require("connect-flash");
// const { listingSchema, reviewSchema }= require("./schema.js");
app.use(express.static(path.join(__dirname, "public"))); //for css
// const Review= require("./models/review.js");
const listingsRouter= require("./routes/listing.js");
const reviewsRouter= require("./routes/review.js");
const userRouter= require("./routes/user.js");
const passport= require("passport");
const LocalStratergy= require("passport-local");
const User= require("./models/user.js");


// const MONGO_URI = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl= process.env.ATLASDB_URL;
main().then(() => {console.log("connection successful")})
.catch(err => console.log(err));
async function main() {
    await mongoose.connect(dbUrl);
}


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

const store= MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600, //time period in seconds
});
store.on("error", ()=>{
    console.log("Error on MONGO SESSION STORE", err);
});
//setting up session
const sessionOptions= {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expire: Date.now() + 7 * 24 * 60 * 60 * 1000,   //week*hrs*min*sec*millisec
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, //for preventing cross-sscripting attacks.
    },
};


app.use(session(sessionOptions));
app.use(flash()); //setting flash before listings operation.

//setting up passport for authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// app.get("/", (req, res) => {
//     res.send("root working");
// });

//setting flash
app.use((req, res, next)=>{
    res.locals.success= req.flash("success");
    res.locals.error= req.flash("error");
    res.locals.currUser= req.user;
    next();
});


app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);


//custom error handler(middleware)
app.all("*", (req, res, next) =>{
    next(new ExpressError(404, "page not found!"));
});

app.use((err, req, res, next) => {
    // res.send("something went wrogn");
    let{statusCode= 500, message= "something went wrogn!"}= err;
    res.status(statusCode).render("error.ejs", { message });
    // res.status(statusCode).send(message);
});

app.listen(8080, () => {
    console.log("Server is running on port 8080...");
});

// app.get("/testListing",async(req,res)=>{
//     let sampleListing = new Listing({
//         title: "New Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Hawaii",
//         country: "USA",
//     });
//     await sampleListing.save();
//     console.log("Listing added");
//     res.send("Listing added");
// });


//Creating New User
// app.get("/demouser", async(req, res)=>{
//     let fakeUser= new User({
//         email: "student@gmail.com",
//         username: "student",
//     })
//     let registeredUser= await User.register(fakeUser, "helloworld");
//     res.send(registeredUser);
// });
    

// 75rhfZK6isf2nb8M mongo atlas password
// akshatgupta3003// mongoatlas username
// mongodb+srv://akshatgupta3003:<db_password>@cluster0.lplje.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0