const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

let data = [
    {
        name: "Sunny Peaks Meadow",
        image: "https://image.shutterstock.com/image-photo/tourist-tent-forest-camp-600w-197022185.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet velit eget lorem cursus semper sit amet eget neque. Cras a augue a tellus ultricies dictum. Nullam sem orci, finibus a fringilla ac, placerat id arcu. Proin justo metus, tempus nec nunc quis, rhoncus viverra nisl. Curabitur ac enim eu justo scelerisque blandit non id lorem. Sed rhoncus erat aliquam eros aliquet, non volutpat lectus dapibus. Curabitur dignissim nulla quis sem maximus luctus. Aliquam eu nibh nec neque consectetur tincidunt. Nulla elementum, libero a volutpat accumsan, odio lacus ornare turpis, non ornare augue justo at erat. Morbi mattis sapien sed lorem malesuada, non porttitor arcu sagittis. In vitae maximus est. Aenean pharetra lectus at elit laoreet, at pharetra eros condimentum."
    },
    {
        name: "End of the Earth",
        image: "https://image.shutterstock.com/image-photo/golden-sunrise-over-european-mountains-600w-358108418.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet velit eget lorem cursus semper sit amet eget neque. Cras a augue a tellus ultricies dictum. Nullam sem orci, finibus a fringilla ac, placerat id arcu. Proin justo metus, tempus nec nunc quis, rhoncus viverra nisl. Curabitur ac enim eu justo scelerisque blandit non id lorem. Sed rhoncus erat aliquam eros aliquet, non volutpat lectus dapibus. Curabitur dignissim nulla quis sem maximus luctus. Aliquam eu nibh nec neque consectetur tincidunt. Nulla elementum, libero a volutpat accumsan, odio lacus ornare turpis, non ornare augue justo at erat. Morbi mattis sapien sed lorem malesuada, non porttitor arcu sagittis. In vitae maximus est. Aenean pharetra lectus at elit laoreet, at pharetra eros condimentum."
    },
    {
        name: "Green Vale",
        image: "https://image.shutterstock.com/image-photo/vintage-photo-autumn-country-landscape-600w-261534959.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet velit eget lorem cursus semper sit amet eget neque. Cras a augue a tellus ultricies dictum. Nullam sem orci, finibus a fringilla ac, placerat id arcu. Proin justo metus, tempus nec nunc quis, rhoncus viverra nisl. Curabitur ac enim eu justo scelerisque blandit non id lorem. Sed rhoncus erat aliquam eros aliquet, non volutpat lectus dapibus. Curabitur dignissim nulla quis sem maximus luctus. Aliquam eu nibh nec neque consectetur tincidunt. Nulla elementum, libero a volutpat accumsan, odio lacus ornare turpis, non ornare augue justo at erat. Morbi mattis sapien sed lorem malesuada, non porttitor arcu sagittis. In vitae maximus est. Aenean pharetra lectus at elit laoreet, at pharetra eros condimentum."
    }
];

function seedDB(){
    Campground.deleteMany({}, (error) => {
        if(error){
            console.log(error);
        }
        else {
            console.log("DB Cleared")
        }
    });
}

// function seedDB() {
//     // Remove all campgrounds
//     Campground.deleteMany({}, (error) => {
//         if(error){
//             console.log(error);
//         }
//         else{
//             console.log("Removed Campgrounds");
//             Comment.deleteMany({}, (error) => {
//                 if(error){
//                     console.log(error);
//                 }
//                 else{
//                     console.log("Removed Comments");
//                 }
//             });
//             seedCamps();
//         }    
//     });
    
//     // Add a few campgrounds
//     function seedCamps(){
//         // Adds some default campgrounds to campgrounds collection
//         data.forEach((seed) => {
//             Campground.create(seed, (error, campground) => {
//                 if(error){
//                     console.log(error);
//                 }
//                 else{
//                     console.log("New Campground added");
//                     seedComments(campground);
//                 }
//             });
//         });
//     };
    
//     function seedComments(campground){
//         // Add some default comments to comments collection
//         Comment.create({
//             text: "This place is great, but no internet!",
//             author: "Berg"
//         }, (error, comment) => {
//             if(error){
//                 console.log(error);
//             }
//             else{
//                 campground.comments.push(comment);
//                 campground.save();
//                 console.log("New Comment added");
//             }
//         });
//     };
// };

module.exports = seedDB;