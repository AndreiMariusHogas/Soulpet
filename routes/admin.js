let express = require('express'),
     router =  express.Router(),
    Soulpet = require("../models/soulpet"),
    Comment = require("../models/comment"),
   passport = require("passport"),
       User = require("../models/user"),
      flash = require("connect-flash");

//Register Admin 
router.get("/admin/new",function(req,res){
    res.render("adminRegister");
});
router.post("/admin/new",function(req,res){
    if(req.body.token === "token"){
        var newUser = new User({username: req.body.username,isAdmin:true});
        User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", "You don't have permission to do that");
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Successfully Signed Up! Welcome to the admin team " + req.body.username);
           res.redirect("/Soulpets"); 
        });
    });
    }
});




//
router.get("/admin", function(req, res){
    res.render("admin"); 
});

router.post("/admin",passport.authenticate("local", {
    successRedirect:"/soulpets",
    failureRedirect:"/login"
}));
module.exports = router;