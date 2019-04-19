var express = require("express");
var router = express.Router();
var User = require("../models/user.js");
var passport = require("passport");

//ROUTES
router.get("/", (req, res) => {
  res.render("home");
});
  
  
//AUTH ROUTES

//SHOW SIGN UP FORM
router.get("/register", (req, res) => {
    res.render("register");
});

//HANDLING USER SIGN UP
router.post("/register", (req, res) => {
    req.body.username;
    req.body.password;
    User.register(new User({username: req.body.username}),req.body.password, (err, user) =>{
        if(err){
            console.log(err);
            
        }
        passport.authenticate("local")(req, res, () =>{
            
            //redirect to that current user items page with add item button
            res.redirect("/items/" + req.user._id);
        });
    });
});


//LOGIN ROUTES

//SHOW LOGIN FROM
router.get("/login", (req, res) =>{
  res.render("login");
});


//LOGIN LOGIC
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
    res.redirect('/items/' + req.user._id)
  });

//LOGOUT ROUTE

router.get("/logout", (req, res) =>{
    req.logout();
    res.redirect("/");
});



module.exports = router;



//isLoggedIn is middleware, it will run before callback, id success, callback(res.render("secret")) will be next()
// router.get("/secret", isLoggedIn, (req, res) => {
//     res.render("secret");
//  });


// router.post("/login", passport.authenticate("local",{
    
//     successRedirect: "/items", 
//     failureRedirect:"/login"
//     }),(req, res)=>{
// });



//MIDDLEWARE WILL CHECK IF USER LOGGED IN OR NOT
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
    
// }


// router.post("/login",
//     function(req, res, next) {
//         passport.authenticate('local', function(err, user) {
//             if (err) { return next(err) }
//             if (!user) {
//                 res.locals("currentUser", req.params);
//                 return res.render("login", { error: true });
//             }

//             // make passportjs setup the user object, serialize the user, ...
//             req.login(user, {}, function(err) {
//                 if (err) { return next(err) };
//                 return res.redirect("/items/"+ req.user._id);
//             });
//         })(req, res, next);
//         return;
//     }
// );




