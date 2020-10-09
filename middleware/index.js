var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
}



middlewareObj.checkCommentOwnership = function (req, res, next) {
    // Is user logged in?// 
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            // Check for error
            if (err) {
                req.flash("error", "Campground not found!");
                res.redirect("back");

                // If no Error then does the user logged in own the comment?
            } else {
                // If owns comment then let them edit
                if (foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
                    next();

                    // If doesnt own campground then redirect back and tell them they dont have permission. 
                } else {
                    req.flash("error", "You dont have permission to do that!");
                    res.redirect("back");
                }
            }

        });
        // Else if user is not even logged in
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}



middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    // Is user logged in?// 
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, foundCampground) {
            // Check for error
            if (err) {
                req.flash("error", "Campground not found");
                res.redirect("back");

                // If no Error then does the user logged in own the campground.?
            } else {
                // If owns campground then let them edit
                if (foundCampground.author.id.equals(req.user._id) || req.user.isAdmin) {
                    next();

                    // If doesnt own campground then tell them they dont have permission. 
                } else {
                    req.flash("error", "You dont have permission to do that!");
                    res.redirect("back");
                }
            }

        });
        // Else if user is not even logged in
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}




module.exports = middlewareObj ;