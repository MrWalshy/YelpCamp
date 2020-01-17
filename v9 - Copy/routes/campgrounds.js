const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
// index.js is automatically recognised inside the 'middleware' directory
const middleware = require("../middleware");

// =========================
// CAMPGROUND ROUTES
// =========================
// INDEX - show all campgrounds
router.get("/", (request, response) => {
    // Get all campgrounds from DB
    Campground.find({}, (error, allCampgrounds) => {
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
router.post("/", middleware.isLoggedIn, (request, response) => {
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
    Campground.create(newCampground, (error, newlyCreated) => {
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
router.get("/new", middleware.isLoggedIn, (request, response) => {
    // Renders the new campground form
    response.render("campgrounds/new.ejs");
});

// SHOW - this has to come after 'NEW'
router.get("/:id", (request, response) => {
    // Find campground with provided ID
    Campground.findById(request.params.id).populate("comments").exec((error, foundCampground) => {
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

// EDIT ROUTE
router.get("/:id/edit", middleware.authorizeUserCampgroundAction, (request, response) => {
        Campground.findById(request.params.id, (error, foundCampground) => {
            if(error){
                response.redirect("/campgrounds");
            }
            else {
                response.render("campgrounds/edit", {campground: foundCampground});
            }
        });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.authorizeUserCampgroundAction, (request, response) => {
    // Find & Update Campground
    Campground.findByIdAndUpdate(request.params.id, request.body.campground, (error, updatedCampground) => {
        console.log(request.params.id);
        if(error){
            response.redirect("/campgrounds");
        }
        else {
            response.redirect("/campgrounds/" + request.params.id);
        }
    });
    // Redirect to show page
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.authorizeUserCampgroundAction, (request, response) => {
    // A form has to be made in the EJS file to handle the http request
    Campground.findByIdAndRemove(request.params.id, (error) => {
        if(error){
            response.redirect("/campgrounds");
        }
        else {
            response.redirect("/campgrounds");
        }
    });
});

module.exports = router;