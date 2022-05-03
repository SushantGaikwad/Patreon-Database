const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser(function(user,done){
    done(null,user)
})

passport.deserializeUser(function(user,done){
    done(null,user)
})

passport.use(new GoogleStrategy ({
    clientID: "655945767641-k9akt8q6lrebn0624j50d6igpumvvvmj.apps.googleusercontent.com",
    clientSecret : "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",
    callbackURL: "http://localhost:9999/google/callback",
    passReqToCallback : true
},
    function(request, accessToken, refreshToken, profile , done){
        // console.log('accessToken',accessToken)
        // console.log("refreshToken",refreshToken)
        // console.log("profileData",profile)
        return done(null, profile);
    }
));

module.exports = passport