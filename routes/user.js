//All backend related to Users
//Basic NodejS setup
const express = require("express");
const mysql = require("mysql");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const db = require("../config/db.js");

const PORT = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
const router = express.Router();

//For Encryption
const bcrypt = require("bcryptjs");

//To Check if user already exists
const checkIfUserExists = require("./middleware/checkIfUserExists.js");
// const checkIfRegister = require("./middleware/loginMiddleware");
//Handle Registering Users
//POST user/signup
router.post("/signup", async (req, res) => {
  var users = {
    full_name: req.body.name,
    blood_group: req.body.blood_type,
    DOB: req.body.dob,
    phone_number: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    verified: 0,
    gender: req.body.gender,
  };
  console.log(users);

  const salt = await bcrypt.genSalt(10);
  users.password = await bcrypt.hash(req.body.password, salt);
  msg = "";
  {
    await db.query(
      "INSERT INTO people SET ?",
      users,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.send("USER NOT REGISTERED");
        } else {
          res.send("USER REGISTERED");
          // res.redirect("/user/logn");
        }
      }
    );
  }
});

router.get("/login", function (req, res) {
  res.render("forms/login");
});

router.get("/signup", function (req, res) {
  res.render("forms/signup");
});

//Handle POST user Login
router.post("/login", async (req, res) => {
  await db.query(
    "SELECT * FROM people WHERE email = ?",
    req.body.email,
    async (error, result, fields) => {
      var isMatch = await bcrypt.compare(req.body.password, result[0].password);
      if (isMatch) {
        isLogged = true;
        req.session.name = result[0].name;
        req.session.user = result[0].PID;
        req.session.admin = true;
        res.send("logged in");
      } else {
        res.send("wrong password");
      }
    }
  );
});

router.get("/logout", function (req, res) {
  req.session.admin = false;
  res.redirect("/");
});
module.exports = router;

// var isMatch = await bcrypt.compare(password, user.password);
