const { request } = require("express");
const express = require("express");
const userController = require("../Controllers/userController");
const validator = require("../Middlewares/validation");
const { body } = require("express-validator");
const app = express();

app.use(express.json());

app.post(
  "/signUp",
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  validator.ValidationResult,
  userController.SignUp
);


module.exports = app;

// This is Ambesh Branch  
