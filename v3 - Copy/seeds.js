const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

let data = [
    {
        name: "Sunny Peaks Meadow",
        image: "https://image.shutterstock.com/image-photo/tourist-tent-forest-camp-600w-197022185.jpg",
        description: "Come down and visit Sunny Peaks Meadow, the land of peace & tranquility"
    },
    {
        name: "End of the Earth",
        image: "https://image.shutterstock.com/image-photo/golden-sunrise-over-european-mountains-600w-358108418.jpg",
        description: "A truly great place on Earth is the End of the Earth, the weather is to die for!"
    },
    {
        name: "Green Vale",
        image: "https://image.shutterstock.com/image-photo/vintage-photo-autumn-country-landscape-600w-261534959.jpg",
        description: "Come visit the Green Vale, home of the most recent dinosaur uprising!"
    }
];

function seedDB() {
    // Remove all campgrounds
    Campground.deleteMany({}, (error) => {
        if(error){
            console.log(error);
        }
        else{
            console.log("Removed Campgrounds");
            Comment.deleteMany({}, (error) => {
                if(error){
                    console.log(error);
                }
                else{
                    console.log("Removed Comments");
                }
            });
            seedCamps();
        }    
    });
    
    // Add a few campgrounds
    function seedCamps(){
        // Adds some default campgrounds to campgrounds collection
        data.forEach((seed) => {
            Campground.create(seed, (error, campground) => {
                if(error){
                    console.log(error);
                }
                else{
                    console.log("New Campground added");
                    seedComments(campground);
                }
            });
        });
    };
    
    function seedComments(campground){
        // Add some default comments to comments collection
        Comment.create({
            text: "This place is great, but no internet!",
            author: "Berg"
        }, (error, comment) => {
            if(error){
                console.log(error);
            }
            else{
                campground.comments.push(comment);
                campground.save();
                console.log("New Comment added");
            }
        });
    };
};

module.exports = seedDB;