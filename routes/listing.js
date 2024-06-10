const express = require("express");
const router = express.Router();
const Images = require("../models/imglisting.js");


//index Route
router.get("/",async (req,res,next) => {
  
    const allListings = await Images.find({});
    req.flash("success", "Welcome to Cloud-Gaming");
    res.render("listings/index.ejs", {allListings});
        
});

//Subscription

// router.get("/:id",async (req,res) => {
//     let {id} = req.params;
//     const listingImg = await Images.findById(id);
//     req.flash("success", "Welcome to Cloud-Gaming");
//     res.render("users/subscription.ejs", {listingImg});                                                                                                                                                                                                                               
// });

module.exports = router;

//req.flash("success","Successful");