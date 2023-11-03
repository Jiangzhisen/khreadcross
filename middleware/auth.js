function requireLogin(req, res, next) {
    if (req.session && req.session.user) {
        // The user has logged in, continue to execute the next middleware or route handler
        return next();
    } else {
        // The user is not logged in, redirected to the login page or other processing methods
        return res.redirect('/login');
    }
}

module.exports = requireLogin;