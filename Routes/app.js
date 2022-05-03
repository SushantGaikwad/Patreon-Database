const express = require("express");
const userController = require("../Controllers/userController");
const validator = require("../Middlewares/validation");
const passport = require('../Authentication/googleLogin')
const cookieSession = require("cookie-session");
const fbPassport = require('../Authentication/facebookLogin')
const JWTService = require('../CommonLib/jwtToken')
const { body } = require("express-validator");
const userModel = require('../Models/user.model')
const encryptDecrypt = require('../EncryptDecrypt/encrypt-decrypt')
const app = express();


app.use(cookieSession({
  name: 'session-name',
  keys: ['key1', 'key2']
}))

app.use(fbPassport.initialize())

app.use(fbPassport.session())
app.use(passport.initialize())

// app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));





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


app.get('/auth/facebook', fbPassport.authenticate('facebook', { scope : 'email,user_photos' }));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.user);
    res.redirect('/success');
  });




module.exports = app;
