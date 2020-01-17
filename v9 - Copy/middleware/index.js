let Campground = require("../models/campground");
let Comment = require("../models/comment");

// All middleware goes in this file
// stores the functions as methods of the middlewareObject
let middlewareObject = {};

middlewareObject.authorizeUserCampgroundAction = (request, response, next) => {
    // Is user logged in?
    if(request.isAuthenticated()){
        console.log("user logged in")
        // Does user own the post?
        Campground.findById(request.params.id, (error, foundCampground) => {
            if(error){
                response.redirect("back");
            }
            else {
                console.log("Second check")
                // '_id' is a string, 'id' is a mongoose object
                // If the campground author is equal to the currently logged in users id
                if(foundCampground.author.id.equals(request.user._id)){
                    console.log("user matches campground author")
                    next()
                }
                else {
                    // "back" takes the user back a page
                    response.redirect("back");
                }
            }
        });
    }
    else {
        // If not, redirect
        console.log("Please login to continue...")
        response.redirect("/login");
    } 
};

middlewareObject.checkCommentOwnership = (request, response, next) => {
    // Is user logged in?
    if(request.isAuthenticated()){
        console.log("user logged in")
        // Does user own the comment?
        Comment.findById(request.params.comment_id, (error, foundComment) => {
            if(error){
                response.redirect("back");
            }
            else {
                console.log("Second check")
                // '_id' is a string, 'id' is a mongoose object
                // If the campground author is equal to the currently logged in users id
                if(foundComment.author.id.equals(request.user._id)){
                    console.log("user id matches comment id")
                    next()
                }
                else {
                    // "back" takes the user back a page
                    response.redirect("back");
                }
            }
        });
    }
    else {
        // If not, redirect
        console.log("Please login to continue...")
        response.redirect("/login");
    } 
};

middlewareObject.isLoggedIn = (request, response, next) => {
    if(request.isAuthenticated()){
        return next();
    }
    response.redirect("/login");
};

module.exports = middlewareObject;