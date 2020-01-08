# YelpCamp Project

* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

Each Campground has:
 * Name
 * Image

 [
     {name: "Lucky 8 Lake", image: "http://www.rubbishimg.com"}
 ]

# Layout & Basic Styling
* Create header & footer partials
* Add in Bootstrap

# Creating
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

# Style the campgrounds page
* Add a better header/title
* Make campgrounds display in a grid

# Style the Navbar & Form
* Add a navbar to all templates
* Style the new campground form

# Notes
- EJS uses '<%- include("partials/header") %>' as of v3.0.1
- Using Bootstrap 4
- REST is a naming convention for routes
- Using MongoDB(NoSQL database)
- CRUD (Create, Read, Update, Delete) are the four basic functions of persistent storage

 ## Databases
 ### Intro to Databases
 * What is a database?
 - Databases store data making it persistent data instead of volatile data. 
 - A collection of information/data.
 - Has an interface for interacting with the info/data. Interface meaning 'can write code' to interact with it.
 * SQL(relational) vs NoSQL(non-relational)
 - SQL databases are tabular/flat & older

 ## Mongoose
 * What is Mongoose?
MongoDB Object modelling for Node.js.

 * Why are we using it?
 Helps to interact with the MongoDB using Javascript