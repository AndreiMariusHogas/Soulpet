let    express = require('express'),
        router =  express.Router(),
       Soulpet = require("../models/soulpet"),
       Comment = require("../models/comment"),
    middleware = require('../middleware/index.js');
      passport = require("passport"),
          User = require("../models/user"),
         flash = require("connect-flash");

router.get("/profile/:id",middleware.isLoggedIn,function(req,res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            req.flash("error","You must be logged in to do that!");
            res.redirect('/login');
        }else{
            res.render('profile/profile',{userProfile:foundUser});
        }

    })
});
router.get("/profile/:id/edit",middleware.isLoggedIn,function(req,res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            req.flash("error","You must be logged in to do that!");
            res.redirect('/login');
        }else{
            res.render('profile/edit',{userProfile:foundUser});
        }

    });
})
router.put("/profile/:id",middleware.isLoggedIn, function(req,res){
    let updatedUser = {
        username: req.body.username,
        avatar: req.body.avatar,
        firstName: req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        age: req.body.age,
        occupation: req.body.occupation,
        phoneNumber: req.body.phoneNumber,
        favoriteAnimal: req.body.favoriteAnimal,
        description: req.body.description
    };
    User.findByIdAndUpdate(req.params.id, {$set: updatedUser} , function(err,updatedUser){
        if(err){
            req.flash("error","You do not have permission to do that");
            res.redirect("/soulpets");
        }
        else{
            req.flash("success","Succesfully updated!")
            res.redirect("/profile/" + updatedUser.id);
        }
    })
})


module.exports = router;