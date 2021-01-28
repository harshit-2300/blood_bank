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
const checkIfPersonExists = require("./middleware/checkIfPersonExists.js");
// const checkIfRegister = require("./middleware/loginMiddleware");
//Handle Registering Users



//POST user/signup
router.post("/add-people", checkIfPersonExists, async (req, res) => {
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
          res.redirect("/admin/index_admin");
        } else {
          
          
          res.redirect("/admin/admin-people");
        }
      }
    );
  }
});



  /*
  msg = "";
  {
    await db.query(
      "INSERT INTO people SET ?",
      users,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.redirect("/admin/index_admin");
        } else {
          var otp = Math.floor(100000 + Math.random() * 900000);
          req.session.otp = otp;
          req.session.email = users.email;
          client.messages
            .create({
              body: otp,
              from: "+17076796056",
              to: "+91" + req.body.phone,
            })
            .then((message) => console.log(message.sid));
          res.redirect("/admin/otp");
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
    res.redirect("/admin/people");
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
*/

router.post("/add-camp", async (req, res) => {
    var camp = {
      camp_start: req.body.start_date,
      camp_end: req.body.end_date,
      location: req.body.location,
      comments: req.body.comments,
    };
    console.log(camp);
  
    
  
  
    msg = "";
    {
      await db.query(
        "INSERT INTO blood_donation_camp SET ?",
        camp,
        function (error, results, fields) {
          if (error) {
            console.log(error);
            res.redirect("/admin/add-camp.html");
          } else {
            
            
            res.redirect("/admin/admin-camps.html");
          }
        }
      );
    }
  });
  



var wrong = false;
router.get("/index_admin", function (req, res) {
  res.render("admin/index_admin", { wrong: wrong });
});

router.get("/add-people", function (req, res) {
    res.render("admin/add-people", { wrong: wrong });
  });

router.get("/admin-people", async (req, res) => {
    await db.query(
      "SELECT * FROM people",
      function (error, result, fields) {
        if (error) {
          console.log(error);
        } else {
          var peoples = result;
          res.render("admin/admin-people", {
            logged: req.session.admin,
            peoples: result,
          });
        }
      }
    );
  });


module.exports = router;

// var isMatch = await bcrypt.compare(password, user.password);
