var mongoose = require("mongoose");
var Soulpet = require("./models/soulpet");
var Comment   = require("./models/comment");
 
 
function seedDB(){
   //Remove all Soulpets
   Soulpet.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed soulpets!");
        Comment.deleteMany({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few soulpets
            data.forEach(function(seed){
                soulpet.create(seed, function(err, soulpet){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a soulpet");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    soulpet.comments.push(comment);
                                    soulpet.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;