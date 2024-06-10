module.exports.isLoggedIn = ( res, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged to play ");
        return res.redirect("/login");
    }
    next();
}