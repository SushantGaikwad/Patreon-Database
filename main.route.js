const express = require("express");
const passport = require('./Authentication/googleLogin');
const cookieSession = require("cookie-session");
const session = require("express-session");
const cors = require("cors");
const app = express();
require("dotenv").config();

const UserRoute = require("./Routes/user");
const AuthRoute = require("./Routes/auth");

app.use(express.json())
app.use(cors());
app.use(passport.initialize());
// const sess = {
//   secret: 'keyboard cat',
//   cookie: {}
// }
// app.use(session(sess));

app.use(cookieSession({
    name: 'session-name',
    keys: ['Patreon'],
    maxAge: 24 * 60 * 60 * 100 
  }));



app.use("/user",UserRoute);
app.use("/auth", AuthRoute);


module.exports = app;

