const express = require("express");
const router = express.Router({mergeParams: true}); // merges params from from comments & campgrounds
const Campground = require("../models/campground");
const Comment = require("../models/comment");

// =========================
// COMMENTS ROUTES
// =========================
router.get("/new", isLoggedIn, (request, response) => {
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

router.post("/", isLoggedIn, (request, response) => {
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
                    // redirect campground show page
                    response.redirect('/campgrounds/' + campground._id);
                }
            });
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