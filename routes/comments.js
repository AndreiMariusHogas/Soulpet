var express= require('express');
var router =  express.Router();
var Soulpet = require("../models/soulpet");
var Comment = require("../models/comment");
var middleware = require('../middleware/index.js');
var flash = require("connect-flash");

//Comments Routes
router.get("/soulpets/:id/comments/new", middleware.isLoggedIn, function(req,res){
    Soulpet.findById(req.params.id,function(err,foundSoulpet){
        if(err){
            res.redirect("/soulpets");
        }else{
            res.render("comments/new",{soulpet:foundSoulpet});
        }
    })
    
});
router.post("/soulpets/:id/comments", middleware.isLoggedIn, function(req,res){
    Soulpet.findById(req.params.id, function(err,foundSoulpet){
        if(err){
            console.log(err);
        }else{
            Comment.create({
                text: req.body.comment.text,
                author: req.body.comment.author
            },function(err,comment){
                if(err){
                    req.flash("error","Something went wrong");
                    console.log(err);
                }else{
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    comment.save();
                    foundSoulpet.comments.push(comment);
                    foundSoulpet.save();
                    console.log("Success!");
                    req.flash("succes","Succesfully added comment");
                    res.redirect("/soulpets/" + req.params.id);
                }
            });
        }
    })
});

router.get("/soulpets/:id/comments/:comment_id/edit",middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back")
        }else{
            res.render("comments/edit", {soulpet_id: req.params.id,comment: foundComment });
        }
    })
    
});

router.put("/soulpets/:id/comments/:comment_id", middleware.checkCommentOwnership,function(req, res){
    Soulpet.findById(req.params.id, function(err, foundSoulpet){
        if(err || !foundSoulpet){
            req.flash("error","Soulpet not found");
            return res.redirect('back');
        };
        Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment , function(err, updatedComment){
            if(err || !updatedComment){
                req.flash("error","No comment found");
                res.redirect("back");
            }else{
                res.redirect("/soulpets/"+ req.params.id);
            }
        });
    });
});
router.delete("/soulpets/:id/comments/:comment_id", middleware.checkCommentOwnership,function(req, res){
    Comment.findByIdAndDelete(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success", "Comment deleted");
            res.redirect("/soulpets/"+req.params.id);
        }
    })
})


module.exports = router;