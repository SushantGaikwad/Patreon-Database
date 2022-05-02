const { request } = require("express");
const express = require("express");
const userController = require("../Controllers/userController");
const validator = require("../Middlewares/validation");
const passport = require('../Authentication/googleLogin')
const session = require('express-session')
const fbPassport = require('passport')
const facebookStrategy = require('passport-facebook').Strategy

const JWTService = require('../CommonLib/jwtToken')
const { body } = require("express-validator");
const userModel = require('../Models/user.model')
const encryptDecrypt = require('../EncryptDecrypt/encrypt-decrypt')
const app = express();
app.use(passport.initialize())
app.use(fbPassport.initialize())
app.use(fbPassport.session())
// app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))


app.use(session)
app.use(express.json());
app.set("view engine","ejs")
app.get('/',(req,res) => {
  res.render("index")
})


app.post(
  "/signUp",
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  validator.ValidationResult,
  userController.SignUp
);

app.get('/failed', (req,res) =>{
    res.send("Some error occured while login to google")
})

app.get('/sucess', (req,res) => {
  res.send("Successfully login to google")
})

app.get('/google', passport.authenticate('google', {
  scope:
      ['email','profile']
}
))

app.get('/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/failed',
    }),
    
     async function(req,res) {

      
        console.log(req.user)
        //let firstName = req.user.given_name
       // let password = encryptedPassword
        let email = req.user.email
        //let picture = req.user.picture
 
        const userDetail = await userModel.findOne({email})
 console.log(userDetail)
        if(userDetail){
         
          let obj = {
            firstName :userDetail.firstName,
            email
          }
          
          let JWTtoken = JWTService.GenerateToken(obj)
       
          res.status(200).json(
            {
              message:"Success Login",
              token : JWTtoken
 
            }
          )
 
        }
        else{
          let encryptedPassword = encryptDecrypt.encryptPassword("sdgrjgoefuofwgj3254357u6575")
          let userDetailObj = {
            name: req.user.given_name,
            email: req.user.email,
            password: encryptedPassword,
            profilePic: req.user._json.picture
 
          }
          let response = await userModel.insertMany([userDetailObj])
          delete userDetailObj.password
       
          let JWTtoken = JWTService.GenerateToken(userDetailObj)
          res.status(200).json({
            message:"Registration Success",
            token:JWTtoken
          });
        }
       
     }
     
    
)

passport.use(new facebookStrategy({
 
  // pull in our app id and secret from our auth.js file
  clientID        : "1175933806565543",
  clientSecret    : "7a52fbc6271511c2af715f79365e7ce6",
  callbackURL     : "http://localhost:9999/auth/facebook/callback",
  // profileFields   : ['id','displayName','name','gender','picture.type(large)','email']

},// facebook will send back the token and profile
function(token, refreshToken, profile, done) {
  
  console.log(profile)
  return done(null,profile)
}));

// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// // used to deserialize the user
// passport.deserializeUser(function(id, done) {
//   return done(null,user)
// })

// app.get('/profile',(req,res) => {
//   res.send("you are authenticated")
// })
// app.get('/',(req,res) => {
//   res.send("Something happen try Again")
// })
app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email,user_photos' }));

app.get('/facebook/callback',
      passport.authenticate('facebook', {
          successRedirect : '/profile',
          failureRedirect : '/failed'
      }));

      app.get('/',(req,res) => {
        res.render("index")
    })
// app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email,user_photos' }));
// app.get('/facebook/callback',passport.authenticate('facebook',{
//   sucessRedirect:'/profile',
//   failiureRedirect:'/'
// }))

app.get('/profile',(req,res) =>{
  res.send("You are a valid user")
})

app.get('/failed',(req,res) =>{
  res.send('you are a not valid user')
})

module.exports = app;
