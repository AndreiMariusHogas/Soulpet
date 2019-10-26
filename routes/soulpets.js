let   express= require('express'),
      router =  express.Router(),
     Soulpet = require("../models/soulpet"),
  middleware = require('../middleware/index.js'),
       flash = require("connect-flash");
//Routes
//Landing
router.get("/", function(req, res){
    res.render('landing');
});
//Index Route- Show all SoulPets
router.get("/soulpets", function(req, res){
    var perPage = 8;
    var pageQuery = parseInt(req.query.page);
    var pageNumber = pageQuery ? pageQuery : 1;
    var noMatch = null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Soulpet.find({name: regex}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allSoulpets) {
            Soulpet.estimatedDocumentCount({name: regex}).exec(function (err, count) {
                if (err) {
                    console.log(err);
                    res.redirect("back");
                } else {
                    if(allSoulpets.length < 1) {
                        noMatch = "No Soulpets match that query, please try again.";
                    }
                    res.render("soulpets/soulpets", {
                        soulpets: allSoulpets,
                        current: pageNumber,
                        pages: Math.ceil(count / perPage),
                        noMatch: noMatch,
                        search: req.query.search
                    });
                }
            });
        });
    } else {
        // get all Soulpets from DB
        Soulpet.find({}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allSoulpets) {
            Soulpet.estimatedDocumentCount().exec(function (err, count) {
                if (err) {
                    console.log(err);
                } else {
                    res.render("soulpets/soulpets", {
                        soulpets: allSoulpets,
                        current: pageNumber,
                        pages: Math.ceil(count / perPage),
                        noMatch: noMatch,
                        search: false
                    });
                }
            });
        });
    }
});

//Add Soulpet Route/new
router.post("/soulpets",middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var url = req.body.url;
    var description = req.body.description;
    var age = req.body.age;
    var author = {id:req.user.id, username: req.user.username};
    var newSoulpet = { name: name, image: url, age:age, description: description, author:author};
    Soulpet.create(newSoulpet, function(err, soulpet){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/soulpets");
        }
    });
});

//Form For New Soulpet
router.get("/soulpets/new",middleware.isLoggedIn, function(req, res){
    res.render("soulpets/new");
});

//Rest /show - Show more info 
router.get("/soulpets/:id",function(req,res){
    Soulpet.findById(req.params.id).populate("comments").exec( function(err, foundSoulpet){
        if (err || !foundSoulpet){
            req.flash("error","Soulpet not found!");
            res.redirect("back");
        }
        else{
            res.render("soulpets/show",{soulpet: foundSoulpet})
        }
    });
    
});
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;