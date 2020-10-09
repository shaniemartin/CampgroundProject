// ======================
//         SETUP
// ======================
var express                 = require("express");
var app                     = express(); 
const { response }          = require("express");


var bodyParser              = require("body-parser");
const mongoose              = require('mongoose');
var flash                   = require("connect-flash");
var passport                = require("passport");
var LocalStrategy           = require("passport-local");
var passportLocalMongoose   = require("passport-local-mongoose");
var methodOverride          = require("method-override");


var Campground              = require("./models/campground");
var Comment                 = require("./models/comment");
var User                    = require("./models/user");

var seedDB                  = require("./seeds");
// seedDB();

var campgroundRoutes        = require("./routes/campgrounds");
var commentRoutes           = require("./routes/comments");
var authRoutes              = require("./routes/auth");



// ====== MONGOOSE SETUP  ======
mongoose.connect('mongodb://localhost:27017/yelp_camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));





// ====== PLUGINS SETUP  ======
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs"); 
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// Passport setup
app.use(require("express-session")({
    secret: "Benson is the best",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Global use of currentUser set up. 
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.locals.moment = require("moment");



// Routes
app.use("/", authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);








// Add a campground manually in code
// Campground.create( 
//     {
//         name: "Shanie's Rest",
//         image: "https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&h=350",
//         description: "Any place is a good place to rest when hiking with Shanie"

//     }, function(err, campground) {
//         if(err){
//             console.log(err);
//         } else {
//             console.log("newly created campground: ");
//             console.log(campground);
//         }
//     }
// );



// ======================
//         ROUTES
// ======================










app.listen(3000, function(req, res) {
    console.log("Server has started");
})