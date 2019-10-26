var express= require('express');
var router =  express.Router();
var Soulpet = require("../models/soulpet");
var middleware = require('../middleware/index.js');
var flash = require("connect-flash");


router.delete("/soulpets/:id",middleware.checkSoulpetOwnership, function(req, res){
    Soulpet.findByIdAndDelete(req.params.id,function(err){
        if(err){
            req.flash('error','You do not have permission to do that');
        }else{
            req.flash('success','Deleted');
            res.redirect("/soulpets");
        }
    })
});

module.exports = router;