
const express = require("express");
const userController = require("../Controllers/userController");
const validator = require("../Middlewares/validation");
const { body } = require("express-validator");
const app = express();

app.use(express.json());

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
  console.log("This is users Middleware");
  res.send("This is User")
})


module.exports = app;
