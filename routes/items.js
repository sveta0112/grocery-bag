var express = require("express");
var router = express.Router();
var Item = require("../models/item.js");



//INDEX ROUTE -->SHOW ALL ITEMS OF CURRENT USER
router.get("/items/:user", (req, res) =>{
  //console.log("user name", req.params.user)
  //Query: db.items.find({"author.id": ObjectId("5cb7090cdcf63742d94415b0")});
  Item.find({"author.id": req.params.user}, (err, myList) =>{
    if(err){
      console.log(myList)
      console.log(err);
    } else {
      console.log("my list", myList)
      res.render("items", {items: myList, currentUser: req.user});
    }
  });
});
  
//CREATE ROUTE  --> ADDS NEW ITEM TO DATABASE FOR CURRENT USER
router.post("/items/:user", isLoggedIn, (req, res)=>{
    var name = req.body.name;
    var category = req.body.category;
    var store = req.body.store;
    var notes = req.body.notes;
    var author = {
      id: req.user._id,
      username: req.user.username
    }
    var newItem = {name: name, category: category, store: store, notes: notes, author: author};
    
    Item.create(newItem, (err, newlyAdded) => {
      if(err){
        console.log(err);
      }else{
        // console.log("added item", newlyAdded);
        // console.log("added user", req.user._id);
        res.redirect("/items/" + req.user._id);
      }
    });
});



//NEW ROUTE  --> SHOW FORM TO ADD NEW ITEM FOR CURRENT USER
router.get("/items/:user/new",isLoggedIn, (req, res) =>{
    res.render("new");
});



//SHOW ROUTE --> shows info about one item of particular user
router.get("/items/:user/iteminfo/:id", (req, res) => {
  Item.findById(req.params.id, (err, foundItem) => {
    if(err){
      console.log(err);
    } else {
      res.render("show", {item: foundItem});
    }
  });
});


//DESTROY ITEM ROUTE
router.delete("/items/:user", function(req, res){
  Item.findByIdAndRemove(req.params.user, function(err){
     if(err){
         res.redirect("/items/" + req.user._id);
     } else {
         res.redirect("/items/" + req.user._id);
     }
  });
});


//MIDDLEWARE WILL CHECK IF USER LOGGED IN OR NOT
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect("/login");
}


module.exports = router;
  

// router.get("/items/:user", (req, res) =>{
//     // console.log(req.user);
//     Item.find({}, (err, allItems) =>{
//       if(err){
//         console.log(err);
//       } else {
//         res.render("items", {items: allItems, currentUser: req.user});
//       }
//     });
// });


// router.get("/items/new",isLoggedIn, (req, res) =>{
//   res.render("new");
// });
