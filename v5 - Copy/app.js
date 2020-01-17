const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const seedDB = require("./seeds");
const Comment = require("./models/comment");

// connects to & creates yelp_camp db
mongoose.connect("mongodb://localhost/yelp_camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
seedDB();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public")); // adds the directory path before the public directory. This looks for files as if /public is root
app.set("view engine", "ejs");

// =========================
// CAMPGROUND ROUTES
// =========================
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
            response.render("campgrounds/index", {campgrounds: allCampgrounds});
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
    response.render("campgrounds/new.ejs");
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
            response.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// =========================
// COMMENTS ROUTES
// =========================
app.get("/campgrounds/:id/comments/new", (request, response) => {
    // Find campground by id
    Campground.findById(request.params.id, (error, campground) => {
        if(error){
            console.log(error);
        }
        else {
            response.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", (request, response) => {
    // lookup campground using id
    Campground.findById(request.params.id, (error, campground) => {
        if(error){
            console.log(error);
            redirect("/campgrounds");
        }
        else {
            // create new comment
            Comment.create(request.body.comment, (error, comment) => {
                if(error){
                    console.log(error);
                }
                else {
                    // connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    response.redirect('/campgrounds/' + campground._id);
                }
            })
            
            // redirect campground show page
        }
    });
});

app.listen(3000, () => {
    console.log("YelpCamp Server Started!");
});