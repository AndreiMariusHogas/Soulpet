var express= require('express');
var router =  express.Router();
var Soulpet = require("../models/soulpet");
var middleware = require('../middleware/index.js');
var flash = require("connect-flash");

router.get("/soulpets/:id/edit",middleware.checkSoulpetOwnership ,function(req, res){
        Soulpet.findById(req.params.id,function(err, foundSoulpet){
        res.render("soulpets/edit", {soulpet: foundSoulpet});
        });
    });
               
                

router.put("/soulpets/:id",middleware.checkSoulpetOwnership,function(req, res){
    var updatedSoulpet = {
        name: req.body.name,
        image: req.body.url,
        age: req.body.age,
        description: req.body.description
    };
    Soulpet.findByIdAndUpdate(req.params.id, updatedSoulpet , function(err,updatedSoulpet){
        if(err){
            req.flash("error","You do not have permission to do that");
            res.redirect("/soulpets");
        }
        else{
            req.flash("success","Succesfully updated!")
            res.redirect("/soulpets/" + updatedSoulpet.id);
        }
    })
});


module.exports = router;