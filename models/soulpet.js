var mongoose = require("mongoose");
 
var soulpetSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   age: String,
   createdAt:{
      type:Date,
      default:Date.now
   },
   author:{
      id: { type: mongoose.Schema.Types.ObjectId,
            ref:"User"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});
 
module.exports = mongoose.model("Soulpet", soulpetSchema);