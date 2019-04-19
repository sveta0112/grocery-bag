var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/user.js");
var Item = require("./models/item.js");
var itemRoutes = require("./routes/items.js");
var indexRoutes = require("./routes/index.js");

mongoose.connect("mongodb://localhost:27017/shopping_list", { useNewUrlParser: true });


var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));


//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Shop bag",
    resave: false,
    saveUninitialized: false
 }));

app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(User.authenticate()));
//reading session, taking data from session that encoded and
//unencoding with deserializer
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//middleware makes currentUser variable will be available on all routes
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});


app.use(indexRoutes);
app.use(itemRoutes);


app.listen(3000, () => {
  console.log("Server started at port 3000!");
});