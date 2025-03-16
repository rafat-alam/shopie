// Aim
// 1. Auto update
// 2. Delete Message
// 3. no data loss on refresh
// 4. logout
// Setting Express
const express = require("express");
const app = express();

// Requiring Path
const path = require("path");

// Port Number
const port = 6777;

// Data Array
let data = [];
let message = [
  {
    user : "rafat",
    content : "Hi! I'am Rafat"
  },
  {
    user : "dev",
    content : "Hi! I'am Dev"
  },
  {
    user : "shubham",
    content : "Hi! I'am Shubham"
  }
];

// Setting EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Setting Static Pages
app.use(express.static(path.join(__dirname, "public")));

// Setting other types of Requests
app.use(express.urlencoded({extended : true}));

// Log In
app.post("/login", (req, res) => {
  let {user, pass} = req.body;
  let olduser = data.find((u) => user === u.user);
  if(olduser && olduser.pass == pass) {
    console.log("Log In : ", {user, pass});
    res.render("login.ejs", {user, message});
  } else {
    console.log("Log In Failed!");
    res.send("failed");
  }
});

// Sign Up
app.post("/signup", (req, res) => {
  let {user, email, pass} = req.body;
  let olduser = data.find((u) => user === u.user);
  if(olduser) {
    console.log("Signup : Failed!");
    res.send("taken")
  } else {
    console.log("Signup : ", {user, email, pass});
    data.push({user, email, pass});
    res.send("success");
  }
});

// Send Message
app.post("/msg", (req, res) => {
  console.log(req.body);
  let {user, msg} = req.body;
  message.push({
    user : user, content : msg
  });
  res.render("login.ejs", {user, message});
});

// Listening on Port for Request
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});