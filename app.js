let             express = require("express"),
                    app = express(),
                   port = process.env.PORT || 3000,
             bodyParser = require("body-parser"),
               mongoose = require('mongoose'),     
               passport = require('passport'),
          LocalStrategy = require('passport-local'),
         methodOverride = require('method-override'),
                  flash = require('connect-flash');
//Routes
let    commentRoutes = require('./routes/comments'),
       soulpetRoutes = require('./routes/soulpets'),
          authRoutes = require('./routes/auth'),
          editRoutes = require('./routes/edit'),
         adminRoutes = require('./routes/admin'),
       profileRoutes = require('./routes/profile'),
        deleteRoutes = require('./routes/delete');
//Mongoose Models Config
let     Soulpet = require('./models/soulpet'),
        Comment = require("./models/comment"),
           User = require ('./models/user');
//Seed
var seedDB = require("./seeds");
//seedDB();
//Mongoose Deprecation Settings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/soulpetv1");

//Settings
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+ "/public"));
app.use(flash());
app.locals.moment = require('moment');  
//Passport Config
app.use(require('express-session')({
    secret: "Shoes are delicious",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
app.use(methodOverride("_method"));





app.use(authRoutes);
app.use(soulpetRoutes);
app.use(commentRoutes);
app.use(editRoutes);
app.use(adminRoutes);
app.use(profileRoutes);
app.use(deleteRoutes);




app.listen(process.env.PORT || 3000, function(){
  console.log("Connected", this.address().port, app.settings.env);
});