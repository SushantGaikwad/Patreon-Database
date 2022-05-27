const express = require("express");
const userController = require("../Controllers/userController");
const cors = require("cors");
const app = express();
const cookieSession = require("cookie-session");

app.use(express.json())
app.use(cors());
app.use(cookieSession({
    name: 'session-name',
    keys: ['Patreon'],
    maxAge: 24 * 60 * 60 * 100 
  }))



app.get("/users",userController.search);
app.post("/post",userController.makePost);
app.get("/getposts",userController.getAllPost);
app.get("/getusers", userController.getAllusers);



module.exports = app;


