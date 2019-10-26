var express= require('express');
var router =  express.Router();
var Soulpet = require("../models/soulpet");
var Comment = require("../models/comment");
var passport = require("passport");
var User = require("../models/user");
var flash = require("connect-flash");

//Register Routes
router.get("/register", function(req, res){
    res.render("register", {page: 'register'}); 
 });
//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to SoulPet! Nice to meet you " + req.body.username);
           res.redirect("/Soulpets"); 
        });
    });
});
//Login Routes
router.get("/login", function(req, res){
    res.render("login", {page: 'login'}); 
 });
router.post("/login",passport.authenticate("local", {
    successRedirect:"/soulpets",
    failureRedirect:"/login"
}));
//Logout Route
router.get("/logout",function(req, res){
    req.logout();
    req.flash("success","Logged out!");
    res.redirect("/");
});


module.exports = router;