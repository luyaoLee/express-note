var express = require('express');
var router = express.Router();

var passport = require('passport')
var GitHubStrategy = require('passport-github').Strategy;

/* GET auth . */

passport.serializeUser(function(user, done) {
    console.log('---serializeUser---')
    console.log(user)
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    console.log('---deserializeUser---')
    done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: '3db2482219b631cfd794',
    clientSecret: 'a616711cecb4f5586513f555acad90bbf878c72d',
    callbackURL: "http://47.91.156.35:9981/auth/github/callback"
}, function(accessToken, refreshToken, profile, done) {
    done(null, profile);
}));

router.get('/github', passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github', {failureRedirect: '/login'}), function(req, res) {
    req.session.user = {
        id: req.user.id,
        username: req.user.displayName || req.user.username,
        avatar: req.user._json.avatar_url,
        provider: req.user.provider
    };
    // Successful authentication, redirect home.
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
