let mongoose = require('mongoose');
let passportLocalMongoose = require("passport-local-mongoose");
let Soulpet= require("../models/soulpet");

var userSchema = new mongoose.Schema({
    username: String, 
    password: String,
    avatar:{type:String,
            default:"http://pluspng.com/img-png/user-png-icon-male-user-icon-512.png"},
    firstName: {
        type:String,
        default:""
    },
    lastName:  {
        type:String,
        default:""
    },
    email: {
        type:String,
        default:""
    },
    age:  {
        type:String,
        default:""
    },
    occupation:  {
        type:String,
        default:""
    },
    phoneNumber:  {
        type:String,
        default:""
    },
    favoriteAnimal:  {
        type: String,
        default:""
    },
    description:  {
        type:String,
        default:""
    },
    isAdmin: {
        type:Boolean,
        default:false
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);