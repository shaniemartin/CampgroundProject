var express = require("express");
var router = express.Router({ mergeParams: true });
var Campground = require("../models/campground");
const { findByIdAndRemove } = require("../models/campground");
var middleware = require("../middleware");



// ====== Campgrounds ROUTE ======
router.get("/", function (req, res) {
    Campground.find({}, function (err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: campgrounds, currentUser: req.user });
        }
    });

});



// ====== POST NEW CAMPGROUND POST ROUTE ======
router.post("/", middleware.isLoggedIn, function (req, res) {
    // get data from form and add to new variable
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var dsc = req.body.description;
    var author = {
            id: req.user._id,
            username: req.user.username
        };
        
    var newCampground = { name: name, image: image, price: price, description: dsc, author: author };


    // add newCampground to our database
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            // if it works redirect to campgrounds page
            res.redirect("/campgrounds");
            console.log(newlyCreated);
        }
    });

});



// ====== NEW CAMPGROUND ROUTE ======
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new.ejs");
});


// ====== SINGLE CAMPGROUND INFO ROUTE ======
router.get("/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });

});



// ====== EDIT Campgrounds ROUTE ======
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        res.render("campgrounds/edit", {campground: foundCampground});

    });

});






// ====== UPDATE Campgrounds ROUTE ======
router.put("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err) {
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Your changes to the campground have been saved!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });

});




// ====== DELETE Campgrounds ROUTE ======
router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndDelete(req.params.id, function(err) {
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })


});



module.exports = router;
