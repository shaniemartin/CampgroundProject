
// ======================
//     AUTH ROUTES
// ======================

var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");



// ====== HOMEPAGE ROUTE ======
router.get("/", function (req, res) {
    res.render("landing");
});



router.get("/register", function (req, res) {
    res.render("register");
})

router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username });


    if(req.body.authCode === "secret") {
        newUser.isAdmin = true;
    }

    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});



router.get("/login", function (req, res) {
    res.render("login");
})

router.post("/login", function(req, res, next) {
    passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: "Welcome back " + req.body.username + "!"
    }) (req, res);
        
});




router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});



module.exports = router