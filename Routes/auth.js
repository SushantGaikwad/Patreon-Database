const express = require("express");
const authController = require("../Controllers/authController");
const validator = require("../Middlewares/validation");
const passport = require('../Authentication/googleLogin')
const cookieSession = require("cookie-session");
const cors = require("cors");
const { body } = require("express-validator");
const app = express();
require("dotenv").config();
app.use(express.json())
app.use(cors());
app.use(passport.initialize())
app.use(passport.session());


app.use(cookieSession({
  name: 'session-name',
  keys: ['Patreon'],
  maxAge: 24 * 60 * 60 * 100 
}))




app.post(
    "/signUp",
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
    validator.ValidationResult,
    authController.SignUp
  );
  
  app.post(
    "/login",
    body("email").isEmail(),
    body("password").isLength({ min: 8 }),
    validator.ValidationResult,
    authController.Login
  );
  
  app.get('/failed', authController.FailureHandler)

  
  app.get('/login/success', authController.LoginSuccess);  
  
  app.get('/google', passport.authenticate('google', {
    scope:
        ['email','profile']
  }
  ))
  
  app.get('/google/callback',
      passport.authenticate('google', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: '/failed',
      })   
  )
  

    module.exports = app;