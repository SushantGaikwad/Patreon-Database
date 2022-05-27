const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy;

require("dotenv").config();

passport.serializeUser(function(user,done){
    done(null,user)
})

passport.deserializeUser(function(user,done){
    done(null,user)
})

passport.use(new GoogleStrategy ({
    clientID: process.env.clientID,
    clientSecret : process.env.clientSecret,
    callbackURL: process.env.callbackURL
},
    function(request, accessToken, refreshToken, profile , done){
        return done(null, profile);
    }
));

module.exports = passport