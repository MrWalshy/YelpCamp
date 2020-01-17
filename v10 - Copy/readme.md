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

# Add Mongoose
* Install & Configure Mongoose
* Setup campground model
* Use campground model inside of our routes

# Show Page
* Review the RESTful routes seen so far
* Add description to campground model
* Show db.collection.drop()
* Add a show route/template

# Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Check all requirements are present

# Add seeds.js
* Add a seeds.js file
* Run the seeds file every time the server starts

# Add the Comment model
* Make errors go away
* Display comments on campground show page

# Comment New/Create
* Nested routes
* Add the comment 'new' & 'create' routes
NEW      |   campgrounds/:id/comments/new    |    GET
Create   |   campground/:id/comments         |    POST
* Add the new comment form

# Style Show Page
* Add sidebar to show page
* Display comments nicely

# Finish Styling Show Page
* Add public directory
* Add custom stylesheet

# Add User Model
* Install all packages needed for authentication
- express-session
- passport
- passport-local
- passport-local-mongoose
* Define User model

# Add Register functionality
* Configure Passport
* Add register routes
* Add register template

# Add Login functionality
* Add login routes
* Add login templates

# Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar

# Show/Hide login/logout/signup links
* Show/hide authorisation links correctly

# Refactor the Routes
* Use express to refactor the routes
* Group the routes according to what they do, (campgrounds, comments, authorisation)

# Users + Comments
* Associate users & comments
* Save author's name to a comment automatically

# Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username+id to newly created campground

# Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username+id to newly created campground

# Editing Campgrounds
* Add Method-Override
* Add Edit Route for Campgrounds
* Add Link to Edit Page
* Add Update Route
* Fix $set problem

# Deleting Campgrounds
* Add Destroy Route
* Add Delete button

# Authorization (What permissions a user has)
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit & delete buttons

# Editing Comments
* Add Edit route for comments
* Add Edit button
* Add Update route

/campgrounds/:id/comments/:comment_id/edit

# Deleting Comments
* Add Destroy route
* Add Delete button

# Authorization 2
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit & delete buttons
* Refactor Middleware

# Adding in Flash
* Demo working version
* Install & configure connect-flash
* Add Bootstrap alerts to header

# Style Landing Page
* Add image carousel

=======================================================
# Notes
- EJS uses '<%- include("partials/header") %>' as of v3.0.1
- Using Bootstrap 4
- REST is a naming convention for routes (Representational State Transfer)
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

 ## RESTFUL ROUTES
 Name       URL                 Verb         Desc.
 ====================================================
 INDEX      /dogs               GET          Display a list of dogs
 NEW        /dogs/new           GET          Display form to make a new dog 
 CREATE     /dogs               POST         Add new dog to DB 
 SHOW       /dogs/:id           GET          Show info about one dog

 ## RESTful Routing
 * What is REST?
 REST - a mapping between HTTP routes & CRUD (CREATE, READ, UPDATE, DESTROY)

 * Why does it matter?
 It is reliable, following a particular pattern.

 * 7 RESTful routes (pattern)
 Name       URL                 Verb         Desc.
 ====================================================
 INDEX      /dogs               GET          Display a list of dogs
 NEW        /dogs/new           GET          Display form to make a new dog 
 CREATE     /dogs               POST         Add new dog to DB 
 SHOW       /dogs/:id           GET          Show info about one dog      
 EDIT       /dogs/:id/edit      GET          Show edit form for one dog  
 UPDATE     /dogs/:id           PUT          Update specific dog, redirect  
 DESTROY    /dogs/:id           DELETE       Delete specific dog, redirect     