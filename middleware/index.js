var middlewareObj={};
var Soulpet = require("../models/soulpet");
var Comment = require("../models/comment");

middlewareObj.checkSoulpetOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Soulpet.findById(req.params.id,function(err, foundSoulpet){
            if(err || !foundSoulpet){
                req.flash("error","Soulpet not found");
                res.redirect("back");
            }else{
                if(foundSoulpet.author.id.equals(req.user.id) || req.user.isAdmin){
                    next();
                }else{
                    req.flash("error","You don't have permission to do that");
                    res.redirect("back")
                }
                
            }
        });
    }else{
        req.flash("error","You need to be logged in to do that");
        res.redirect("back");
    };
}
middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err, foundComment){
            if(err || !foundComment){
                req.flash("error","Comment not found");
                res.redirect("back");
            }else{
                if(foundComment.author.id.equals(req.user.id) || req.user.isAdmin){
                    next();
                }else{
                    req.flash("error","You don't have permission to do that");
                    res.redirect("back")
                }
                
            }
        });
    }else{
        req.flash("error","You need to be logged in to do that");
        res.redirect("back");
    };
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in to do that!");
    res.redirect("/login");
};

module.exports = middlewareObj;