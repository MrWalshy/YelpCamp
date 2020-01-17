const express = require("express");
const router = express.Router({mergeParams: true}); // merges params from from comments & campgrounds
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../middleware");

// =========================
// COMMENTS ROUTES
// =========================
// SHOW NEW COMMENT FORM
router.get("/new", middleware.isLoggedIn, (request, response) => {
    // Find campground by id
    Campground.findById(request.params.id, (error, campground) => {
        if(error || !campground){
            console.log(error);
            request.flash("error", "Campground not found!");
            response.redirect("back");
        }
        else {
            response.render("comments/new", {campground: campground});
        }
    });
});

// CREATE COMMENT
router.post("/", middleware.isLoggedIn, (request, response) => {
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
                    request.flash("error", "Something went wrong!")
                    console.log(error);
                }
                else {
                    // add username & id to comment
                    comment.author.id = request.user._id;
                    comment.author.username = request.user.username;
                    // save comment
                    comment.save();
                    // connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    request.flash("success", "Comment successfully added!")
                    // redirect campground show page
                    response.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

// COMMENTS EDIT ROUTE
// checkCommentOwnership needs to be on the EDIT, UPDATE, & DESTROY routes for security
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (request, response) => {
    Campground.findById(request.params.id, (error, foundCampground) => {
        if(error || !foundCampground){
            request.flash("error", "Cannot find the campground");
            return response.redirect("back");
        }
        Comment.findById(request.params.comment_id, (error, foundComment) => {
            if(error){
                response.redirect("back");
            }
            else {
                response.render("comments/edit", {campground_id: request.params.id, comment: foundComment});
            }
        });
    });    
});


// COMMENTS UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, (request, response) => {
    Comment.findByIdAndUpdate(request.params.comment_id, request.body.comment, (error, updatedComment) => {
        if(error){
            response.redirect("back");
        }
        else {
            response.redirect("/campgrounds/" + request.params.id);
        };
    });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, (request, response) => {
    Comment.findByIdAndRemove(request.params.comment_id, (error, deletedComment) => {
        if(error){
            response.redirect("back");
        }
        else {
            request.flash("success", "Comment successfully deleted!");
            // .id is the campground id
            response.redirect("/campgrounds/" + request.params.id);
        }
    });
});

module.exports = router;