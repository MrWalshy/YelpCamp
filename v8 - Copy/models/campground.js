let mongoose = require("mongoose");

// SCHEMA
let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"},
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Campground", campgroundSchema);
// let Campground = mongoose.model("Campground", campgroundSchema);

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
