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

const accountSid = "AC142fc44869b899d213595efc3506423a";
const authToken = "18fd4e04f4f942a98a17ed1bc2214307";
const client = require("twilio")(accountSid, authToken);

//For Encryption
const bcrypt = require("bcryptjs");

//To Check if user already exists
const checkIfUserExists = require("./middleware/checkIfUserExists.js");
// const checkIfRegister = require("./middleware/loginMiddleware");
//Handle Registering Users
//POST user/signup
router.post("/signup", checkIfUserExists, async (req, res) => {
  var users = {
    full_name: req.body.name,
    blood_group: req.body.blood_type,
    DOB: req.body.dob,
    phone_number: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    verified: 0,
    gender: req.body.gender,
    user_type: req.body.user_type,
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
          res.redirect("/");
        } else {
          var otp = Math.floor(100000 + Math.random() * 900000);
          req.session.otp = otp;
          req.session.email = users.email;
          console.log("+91" + req.body.phone);
          client.messages
            .create({
              body: otp,
              from: "+17076796056",
              to: "+91" + req.body.phone,
            })
            .then((message) => console.log(message.sid));
          res.redirect("/user/otp");
        }
      }
    );
  }
});

router.get("/otp", async (req, res) => {
  res.render("otp");
});

router.post("/otp", async (req, res) => {
  if (req.body.otp == req.session.otp) {
    res.redirect("/user/login");
  } else {
    await db.query(
      "DELETE FROM people WHERE email =?",
      email,
      function (err, res, fields) {
        if (err) {
          console.log(err);
        } else {
          res.send("Wrong OTP");
        }
      }
    );
  }
});
var wrong = false;
router.get("/login", function (req, res) {
  res.render("forms/login", { wrong: wrong });
});

router.get("/login-redirect",async (req, res)=> {
    await db.query(
    "SELECT * FROM Blood_donation_camp",
    function(error,result,fields){
      if (error) {
        console.log(error);
        res.send("error");
      } else {
        res.render("forms/login-redirect", { wrong: wrong,
          user_type:req.session.user_type,
          camps:result, });
      }
    }
  );
  
});  

router.post("/login-redirect", async (req, res) => {
  var bdcid=req.body.user_location;
  req.session.bdcid=bdcid;
  res.redirect("/data-entry");


});

router.get("/signup", function (req, res) {
  res.render("forms/signup", { registered: req.session.reg });
});

//Handle POST user Login

router.post("/login", async (req, res) => {
  await db.query(
    "SELECT * FROM people WHERE email = ?",
    req.body.email,
    async (error, result, fields) => {
      if (result.length == 0) {
        wrong = true;
        res.redirect("/user/login");
      }
      var isMatch = await bcrypt.compare(req.body.password, result[0].password);

      if (isMatch) {
        isLogged = true;
        req.session.name = result[0].name;
        req.session.user = result[0].PID;
        req.session.admin = true;
        req.session.user_type = result[0].user_type;
        console.log(req.session.user_type);
        wrong = false;
        res.redirect("/user/login-redirect");
      } else {
        wrong = true;
        res.redirect("/user/login");
      }
    }
  );
});

router.get("/logout", function (req, res) {
  req.session.admin = false;
  res.redirect("/user/login");
});
module.exports = router;

// var isMatch = await bcrypt.compare(password, user.password);
