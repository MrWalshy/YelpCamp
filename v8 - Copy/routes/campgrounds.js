const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");

// =========================
// CAMPGROUND ROUTES
// =========================
// INDEX - show all campgrounds
router.get("/", (request, response) => {
    // Get all campgrounds from DB
    Campground.find({}, function(error, allCampgrounds){
        if(error){
            console.log(error);
        }
        else {
            // allCampgrounds is from the DB
            response.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
    // response.render("campgrounds", {campgrounds: campgrounds});
});

// CREATE - add new campground to DB
router.post("/", isLoggedIn, (request, response) => {
    // Get data from form & Add to campgrounds array
    let name = request.body.name;
    let image = request.body.image;
    let description = request.body.description;
    let author = {
        id: request.user._id,
        username: request.user.username
    };
    let newCampground = {
        name: name, 
        image: image,
        description: description,
        author: author
    };
    console.log(newCampground);

    // Create new campground & save to DB
    Campground.create(newCampground, function(error, newlyCreated){
        if(error){
            console.log(error);
        }
        else {
            // Redirect back to campgrounds page
            console.log(newlyCreated);
            response.redirect("/campgrounds");
        }
    });    
});

// NEW - show form to create new campground
router.get("/new", isLoggedIn, (request, response) => {
    // Renders the new campground form
    response.render("campgrounds/new.ejs");
});

// SHOW - this has to come after 'NEW'
router.get("/:id", (request, response) => {
    // Find campground with provided ID
    Campground.findById(request.params.id).populate("comments").exec(function(error, foundCampground){
        if(error){
            console.log(error);
        }
        else {
            console.log(foundCampground);
            // Render 'show' ejs template with that campground id
            response.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

function isLoggedIn(request, response, next){
    if(request.isAuthenticated()){
        return next();
    }
    response.redirect("/login");
};

module.exports = router;