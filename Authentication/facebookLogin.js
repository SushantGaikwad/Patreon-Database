const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;


passport.use(new FacebookStrategy({
    clientID: 1175933806565543 ,
    clientSecret: '7a52fbc6271511c2af715f79365e7ce6',
    callbackURL: "https://localhost:9999/auth/facebook/callback",
    passReqToCallback : true
  },
  function(token,refreshtoken,profile,done){
      console.log(profile)
      return done(null,profile)
  }
));
passport.serializeUser(function(user,done){
    done(null,user)
})

passport.deserializeUser(function(user,done){
 
    return done(null,user)
})

module.exports = passport