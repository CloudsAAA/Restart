const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");

router.get("/signup", ( req, res ) => {
    res.render("users/signup.ejs");
});

router.post(
  "/signup", 
  async(req,res,next) => {
   try{
    let { username, email, subscription, password } = req.body;
    const newUser = new User({ email, subscription, username});
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => { //for direct acces to application
      if(err) {
        return next(err);
      }
      req.flash("success", "Welcome to Cloud-Gaming");
      res.redirect("/listings");
    });
   }catch(e) {
    req.flash("error", "User already exist");
    res.redirect("/signup");
   }
});

router.get("/login", (req,res) => {
    res.render("users/login.ejs");
});

router.post(
    "/login", 
    passport.authenticate("local", { 
     failureRedirect: "/login", 
     failureFlash: true,
  }), 

  async(req, res ) => {
    res.redirect("/listings");
  }
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if(err) {
     return next(err);
    }
    req.flash("success", "You are log out");
    res.redirect("/listings");
  });
});

module.exports = router;