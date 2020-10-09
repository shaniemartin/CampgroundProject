var mongoose = require("mongoose");

var Campground = require("./models/campground");
var Comment = require("./models/comment");


var data = [
    { 
        name: "Clouds Rest", 
        image: "https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&h=350}",
        description: "Praesent egestas pharetra sem, placerat accumsan mi vestibulum sed. Sed dictum ultrices ex, eu imperdiet augue molestie et. Ut pretium posuere lacus venenatis aliquam. Ut molestie elementum lacus, sit amet consectetur lectus ullamcorper in. Curabitur sodales justo eu arcu commodo feugiat. Morbi euismod urna sed posuere auctor. Morbi et sollicitudin lacus, ac pretium arcu. Vivamus at feugiat quam. Phasellus pellentesque vitae neque at sodales. Integer malesuada rhoncus mauris. Mauris egestas dolor id nibh viverra, nec faucibus dui placerat.Sed erat risus, cursus eget sem in, vestibulum scelerisque magna.Aliquam dictum turpis in dictum tempor.Curabitur nec sollicitudin eros.Nam id enim sit amet leo dignissim ultrices.Suspendisse sem dolor, tempor eu venenatis vel, auctor molestie leo.Sed lorem neque, efficitur et ipsum sed, pretium luctus ante.Quisque eu est in arcu venenatis egestas a a mi."
    },

    {
        name: "Nice Visit",
        image: "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "Praesent egestas pharetra sem, placerat accumsan mi vestibulum sed. Sed dictum ultrices ex, eu imperdiet augue molestie et. Ut pretium posuere lacus venenatis aliquam. Ut molestie elementum lacus, sit amet consectetur lectus ullamcorper in. Curabitur sodales justo eu arcu commodo feugiat. Morbi euismod urna sed posuere auctor. Morbi et sollicitudin lacus, ac pretium arcu. Vivamus at feugiat quam. Phasellus pellentesque vitae neque at sodales. Integer malesuada rhoncus mauris. Mauris egestas dolor id nibh viverra, nec faucibus dui placerat.Sed erat risus, cursus eget sem in, vestibulum scelerisque magna.Aliquam dictum turpis in dictum tempor.Curabitur nec sollicitudin eros.Nam id enim sit amet leo dignissim ultrices.Suspendisse sem dolor, tempor eu venenatis vel, auctor molestie leo.Sed lorem neque, efficitur et ipsum sed, pretium luctus ante.Quisque eu est in arcu venenatis egestas a a mi."
    },

    {
        name: "Mountain Goats Rest",
        image: "https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e507440722e79d4924ac6_340.jpg",
        description: "Praesent egestas pharetra sem, placerat accumsan mi vestibulum sed. Sed dictum ultrices ex, eu imperdiet augue molestie et. Ut pretium posuere lacus venenatis aliquam. Ut molestie elementum lacus, sit amet consectetur lectus ullamcorper in. Curabitur sodales justo eu arcu commodo feugiat. Morbi euismod urna sed posuere auctor. Morbi et sollicitudin lacus, ac pretium arcu. Vivamus at feugiat quam. Phasellus pellentesque vitae neque at sodales. Integer malesuada rhoncus mauris. Mauris egestas dolor id nibh viverra, nec faucibus dui placerat.Sed erat risus, cursus eget sem in, vestibulum scelerisque magna.Aliquam dictum turpis in dictum tempor.Curabitur nec sollicitudin eros.Nam id enim sit amet leo dignissim ultrices.Suspendisse sem dolor, tempor eu venenatis vel, auctor molestie leo.Sed lorem neque, efficitur et ipsum sed, pretium luctus ante.Quisque eu est in arcu venenatis egestas a a mi."
    }
]

function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");


            // Add a few campgrounds using var data 
            data.forEach(function (seed) {
                Campground.create(seed, function (err, campground) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("added a campground");

                        // Create comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: {
                                    username: "Jake Rickard"
                                }
                            }, function (err, comment) {
                                if(err) {
                                    console.log(err);
                                } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment!");
                                }
                            });
                    }
                });

            });
        });
    });



    
}

module.exports = seedDB;
