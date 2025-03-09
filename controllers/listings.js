const Listing= require("../models/listing");

//Index
module.exports.index= async (req, res) => {
    const allListings= await Listing.find({})           
    res.render("listings/index.ejs", {allListings});    //pasting code from index route
}

//New
module.exports.renderNewForm= (req, res) => {
    // console.log(req.user);
    res.render("listings/new.ejs");
}

//Show
module.exports.showListing= async(req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews",populate: {path: "author",},}).populate("owner");
    if(!listing){  //flash error
        req.flash("error", "This Listing Does not exists anymore!");
        res.redirect("/listings");
    }
    // console.log(listing);
    res.render("listings/show.ejs", {listing});
}

//Create
module.exports.createListing= async (req, res, next) => {
    // let {title, description,image,  price, location, country} = req.body;
        // if(!req.body.listing){
        //     throw new ExpressError(404,"send valid data");
        // }
        //this goes to validate schema function at top

        // let result= listingSchema.validate(req.body);
        // console.log(result);
        // if(result.error){
        //     throw new ExpressError(400, result.error);
        // }
        //multer image upload logic
        const url= req.file.path;
        const filename= req.file.filename;

        const newListing= new Listing(req.body.listing);
        newListing.owner= req.user._id;// Adding owner info
        newListing.image= {url, filename}; 
        await newListing.save();
        req.flash("success", "New listing Created.");
        res.redirect("/listings");
}

//Edit
module.exports.renderEditForm= async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){    //flash error
        req.flash("error", "This Listing Does not exists anymore!");
        res.redirect("/listings");
    }

    let originalImageUrl= listing.image.url;
    originalImageUrl= originalImageUrl.replace("/upload", "/upload/w_200");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
}

//Update
module.exports.updateListing= async(req, res) => {
    let {id} = req.params;
    // for server side authorization
    // let listing= await Listing.findById(id);   //for authorization
    // if(!listing.owner.equals(res.locals.currUser._id)){
    //     req.flash("error", "You dont have permission to edit.");
    //     return res.redirect(`/listings/${id}`);
    // }
    let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing});

    //edit listing file upload
    if(typeof req.file !== "undefined"){
        const url= req.file.path;
        const filename= req.file.filename;
        listing.image= {url, filename};
        await listing.save();
    }

    req.flash("success", "Listing Updated.");
    res.redirect(`/listings/${id}`);
}

//Delete
module.exports.destroyListing= async(req, res) => {
    let {id}= req.params;
    let deletedListing= await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted.");
    res.redirect("/listings");
}

//Search
// module.exports.searchListing = async (req, res) => {
//     let { search } = req.query;
//     console.log("Search query:", search); // Log the search query

//     if (!search || search.trim() === "") {
//         // If the search term is empty, return an error message or redirect
//         return res.render("listings/search.ejs", { listings: [], search: "" });
//     }

//     try {
//         let listings = await Listing.find({
//             title: { $regex: search, $options: "i" }
//         });
//         console.log("Listings found:", listings); // Log the listings found
//         res.render("listings/search.ejs", { listings, search });
//     } catch (err) {
//         console.error("Error during search:", err); // Log any errors
//         res.status(500).send("Internal Server Error");
//     }
// }
// module.exports.searchListing= async(req, res) => {
//     let {search}= req.query;
//     let listings= await Listing.find({title: {$regex: search, $options: "i"}});
//     res.render("listings/search.ejs", {listings, search});
// }