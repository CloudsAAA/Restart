if(process.env.NODE_ENV !="production"){
    require("dotenv").config();
}

const express= require("express");
const app = express();
const mongoose = require("mongoose");
const Images = require("./models/imglisting.js");
const path = require("path");
const methoOverride = require("method-override");
const ejsMate = require("ejs-Mate");
// const wrapAsync = require("./utils/wrapAsync.js");
const listingRouter = require("./routes/listing.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
// const multer = require("multer");cls


// const {isLoggedIn} = require("./middleware.js");
const User = require("./models/user.js");
const userRouter = require("./routes/user.js");
// const {listingSchema} = require("./schema.js");//forServerValidation

//CONNECTION
// const MONGO_URL = "mongodb://127.0.0.1:27017/C-GamingDB";

const dbUrl = process.env.ATLASDB_URL;

main()
.then( () => {
    console.log("Connected to DB");
})
.catch( (err) => {
    console.log(err,"custom error handler");
});

async function main() {
    // await mongoose.connect(MONGO_URL);
    await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methoOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
    mongoUrl: dbUrl,//db
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());// For password.
app.use(passport.session());//allow user to login once.
passport.use(new LocalStrategy(User.authenticate()));//to let the user login and signUp

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.curUser = req.user;//for user
    console.log(res.locals.success);
    console.log(res.locals.error);
    next();
});

//For Using  routes
app.use("/listings", listingRouter);
app.use("/", userRouter);

app.listen(8080, () => {
    console.log("Server is listining on port 8080");
});