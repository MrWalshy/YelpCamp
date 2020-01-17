// IMPORTS
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const methodOverride = require("method-override");

const Campground = require("./models/campground");
const seedDB = require("./seeds");
const User = require("./models/user");
const Comment = require("./models/comment");

const commentRoutes = require("./routes/comments");
const campgroundRoutes = require("./routes/campgrounds");
const authRoutes = require("./routes/auth");

// connects to & creates yelp_camp db
mongoose.connect("mongodb://localhost/yelp_camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// seedDB();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public")); // adds the directory path before the public directory. This looks for files as if /public is root
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "A blue balloon goes bouncing on!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// 'locals' is the document
app.use((request, response, next) => {
    // adds 'currentUser' to all templates
    // 'request.user' is empty until logged in
    response.locals.currentUser = request.user;
    next();
});

// Uses the route files
app.use("/campgrounds/:id/comments", commentRoutes);
// Adds '/campgrounds' to the beginning of all campgroundRoutes
app.use("/campgrounds", campgroundRoutes);
app.use(authRoutes);

app.listen(3000, () => {
    console.log("YelpCamp Server Started!");
});