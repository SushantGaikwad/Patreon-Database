
const express = require("express");
const userController = require("../Controllers/userController");
const validator = require("../Middlewares/validation");
const passport = require('../Authentication/googleLogin')
const cookieSession = require("cookie-session");
const fbPassport = require('../Authentication/facebookLogin')
const cors = require("cors");
const encryptDecrypt = require("../CommonLib/encrypt-decrypt");


const JWTService = require('../CommonLib/jwtToken')
const { body } = require("express-validator");
const userModel = require('../Models/user.model');
const app = express();
app.use(express.json())

// app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(cors());

app.use(
  cors({
    Host:"patreondatabase.herokuapp.com",
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
    "Access-Control-Allow-Creadentials" : true,
    "Access-Control-Allow-Origin" : "http://localhost:3000"
   
  })
);
app.use(cors());

app.get("/",(req,res)=>{
  res.send('This is Dashboard' , '\n', '1. /SignUp','\n','2. /login'  );
})

app.post(
  "/signUp",
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  validator.ValidationResult,
  userController.SignUp
);

app.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  validator.ValidationResult,
  userController.Login
);

app.get("/users",validator.isValidToken,(req,res)=>{
  res.send("This is User")
})



app.use(cookieSession({
  name: 'session-name',
  keys: ['key1', 'key2']
}))

app.use(passport.initialize())
app.use(fbPassport.initialize())
app.use(fbPassport.session())

app.get('/failed', (req,res) =>{
    res.send("Some error occured while login to google")
})

app.get('/login/success', async (req,res) =>{
    res.json(req.user);
  // if (req.user) {
  //   let email = req.user.email
  //   const userDetail = await userModel.findOne({email})
  //    console.log(userDetail)
  //   if(userDetail){
     
  //     let obj = {
  //       firstName :userDetail.firstName,
  //       email
  //     }
      
  //     let JWTtoken = JWTService.GenerateToken(obj)
   
  //     res.status(200).json(
  //       {
  //         message:"Success Login",
  //         token : JWTtoken

  //       }
  //     )

  //   }
  //   else{
  //     let encryptedPassword = encryptDecrypt.encryptPassword("sdgrjgoefuofwgj3254357u6575")
  //     let userDetailObj = {
  //       name: req.user.given_name,
  //       email: req.user.email,
  //       password: encryptedPassword,
  //       profilePic: req.user._json.picture

  //     }
  //     await userModel.insertMany([userDetailObj])
  //     delete userDetailObj.password
   
  //     let JWTtoken = JWTService.GenerateToken(userDetailObj)
  //     res.status(200).json({
  //       message:"Registration Success",
  //       token:JWTtoken
  //     });
  //   }

  // }
})


app.get('/google', passport.authenticate('google', {
  scope:
      ['email','profile']
}
))

app.get('/google/callback',
    passport.authenticate('google', {
      successRedirect: "http://localhost:3000/",
      failureRedirect: '/failed',
    })   
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
