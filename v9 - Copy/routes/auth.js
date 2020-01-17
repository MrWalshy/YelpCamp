const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

router.get("/", (request, response) => {
    response.render("landing");
});

// =========================
// AUTHORISATION ROUTES
// =========================
// show register form
router.get("/register", (request, response) => {
    response.render("register");
});

// handle the sign up logic
router.post("/register", (request, response) => {
    let newUser = new User({username: request.body.username});
    User.register(newUser, request.body.password, (error, user) => {
        if(error){
            console.log(error);
            return response.render("register");
        }
        passport.authenticate("local")(request, response, () => {
            response.redirect("/campgrounds");
        });
    });
});

// Show login form
router.get("/login", (request, response) => {
    response.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
    }), (request, response) => {  
});

// logout route
router.get("/logout", (request, response) => {
    request.logout();
    response.redirect("/campgrounds");
});

module.exports = router;