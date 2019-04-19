var mongoose = require("mongoose");



var itemSchema= new mongoose.Schema({
   category: String,
   store: String, 
   notes: String,
   author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }, 
    username: String
  },
});



var Item = mongoose.model("Item", itemSchema);
module.exports = Item;