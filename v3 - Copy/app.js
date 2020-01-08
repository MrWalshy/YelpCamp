const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const seedDB = require("./seeds");

// connects to & creates yelp_camp db
mongoose.connect("mongodb://localhost/yelp_camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
seedDB();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// ROUTES
app.get("/", (request, response) => {
    response.render("landing");
});

// INDEX - show all campgrounds
app.get("/campgrounds", (request, response) => {
    // Get all campgrounds from DB
    Campground.find({}, function(error, allCampgrounds){
        if(error){
            console.log(error);
        }
        else {
            // allCampgrounds is from the DB
            response.render("index", {campgrounds: allCampgrounds});
        }
    });
    // response.render("campgrounds", {campgrounds: campgrounds});
});

// CREATE - add new campground to DB
app.post("/campgrounds", (request, response) => {
    // Get data from form & Add to campgrounds array
    let name = request.body.name;
    let image = request.body.image;
    let description = request.body.description;
    let newCampground = {
        name: name, 
        image: image,
        description: description
    };

    // Create new campground & save to DB
    Campground.create(newCampground, function(error, newlyCreated){
        if(error){
            console.log(error);
        }
        else {
            // Redirect back to campgrounds page
            response.redirect("/campgrounds");
        }
    });    
});

// NEW - show form to create new campground
app.get("/campgrounds/new", (request, response) => {
    // Renders the new campground form
    response.render("new.ejs");
});

// SHOW - this has to come after 'NEW'
app.get("/campgrounds/:id", (request, response) => {
    // Find campground with provided ID
    Campground.findById(request.params.id).populate("comments").exec(function(error, foundCampground){
        if(error){
            console.log(error);
        }
        else {
            console.log(foundCampground);
            // Render 'show' ejs template with that campground id
            response.render("show", {campground: foundCampground});
        }
    });
});

app.listen(3000, () => {
    console.log("YelpCamp Server Started!");
});