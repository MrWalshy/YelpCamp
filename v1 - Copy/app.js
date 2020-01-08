const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

let campgrounds = [
    {name: "Crazy Place", image: "https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72287ed6914dc650_340.png"},
    {name: "Zombie Central", image: "https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c72287ed6914dc650_340.jpg"},
    {name: "The Hill", image: "https://pixabay.com/get/57e1dd4a4350a514f6da8c7dda793f7f1636dfe2564c704c72287ed6914dc650_340.jpg"},
    {name: "Crazy Place", image: "https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72287ed6914dc650_340.png"},
    {name: "Zombie Central", image: "https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c72287ed6914dc650_340.jpg"},
    {name: "Crazy Place", image: "https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72287ed6914dc650_340.png"},
    {name: "Zombie Central", image: "https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c72287ed6914dc650_340.jpg"},
    {name: "Crazy Place", image: "https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72287ed6914dc650_340.png"},
    {name: "Zombie Central", image: "https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c72287ed6914dc650_340.jpg"}
];
// ROUTES
app.get("/", (request, response) => {
    response.render("landing");
});

app.get("/campgrounds", (request, response) => {
    response.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", (request, response) => {
    // Get data from form & Add to campgrounds array
    let name = request.body.name;
    let image = request.body.image;
    let newCampground = {name: name, image: image};

    campgrounds.push(newCampground);
    // Redirect back to campgrounds page
    response.redirect("/campgrounds");
});

app.get("/campgrounds/new", (request, response) => {
    response.render("new.ejs");
});

app.listen(3000, () => {
    console.log("YelpCamp Server Started!");
});