const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// connects to & creates yelp_camp db
mongoose.connect("mongodb://localhost/yelp_camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA
let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

let Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Crazy Place",
//     image: "https://images.unsplash.com/photo-1577470527717-e057e5701b3c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80",
//     description: "Come check the crazy, this place will blow your mind. A stone beauty, just watch out for the crazies!"
// }, function(error, campground){
//     if(error){
//         console.log(error);
//     } 
//     else {
//         console.log("Added Campground:");
//         console.log(campground);
//     }
// });

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
    Campground.findById(request.params.id, function(error, foundCampground){
        if(error){
            console.log(error)
        }
        else {
            // Render 'show' ejs template with that campground
            response.render("show", {campground: foundCampground});
        }
    });
    
});

app.listen(3000, () => {
    console.log("YelpCamp Server Started!");
});