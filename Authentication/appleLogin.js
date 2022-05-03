const passport = require('passport')
const AppleStrategy =  require('passport-apple').Strategy

passport.use(new AppleStrategy({
    clientID: "",
    teamID: "",
    callbackURL: "",
    keyID: "",
    privateKeyLocation: "",
    passReqToCallback: true
}, function(req, token, refreshToken, decodedIdToken, profile, cb) {
    // Here, check if the decodedIdToken.sub exists in your database!
    // decodedIdToken should contains email too if user authorized it but will not contain the name
    // `profile` parameter is REQUIRED for the sake of passport implementation
    // it should be profile in the future but apple hasn't implemented passing data
    // in access token yet https://developer.apple.com/documentation/sign_in_with_apple/tokenresponse
    cb(null, decodedIdToken);
}));