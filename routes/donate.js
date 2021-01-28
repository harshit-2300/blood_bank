const express = require("express");
const mysql = require("mysql");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const db = require("../config/db.js");
app.use(bodyParser.json());

const PORT = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
const router = express.Router();
const upload = require("./middleware/multerMiddleware");


router.post("/search", async (req, res) => {
  await db.query(
    "SELECT * FROM people WHERE email = ?",
    req.body.email,
    async (error, result, fields) => {
      if (result.length == 0) {
        wrong = true;
        res.redirect("/registeration-step1.html");
      }
      else{
      req.session.user_exist=result;
      res.redirect("/registeration-step1.html");
      }
      
    }
  );
});




router.post("/registeration-step1", async (req, res) => {
  var today = new Date();
  var users = {
    blood_group: req.body.blood_type,
    weight: req.body.weight,
    height: req.body.height,
    gender: req.body.gender,
    next_donation_date: today,
    previous_sms_date: today,
    phone: req.body.phone,
  };

  var did=100;
  
  
    await db.query(
      "SELECT * FROM donor",
      function (error, result, fields) {
        if (error) {
          console.log(error);
        } else {
          
          console.log(result.length);
          did=result.length+1;
          };
        });
      
      
  
  

  await db.query(
    "INSERT INTO donor SET ?",
    users,
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.send("error");
      } else {
        req.session.did=did;
        res.redirect("/donation-step3.html");
      }
    }
  );
});

router.post("/pretest-step2",async(req,res)=> {
  res.redirect("/donation-step3.html");
})

router.post("/final", async (req, res) => {
  var reject;
  if (req.body.result == "Accepted") {
    reject = 0;
  } else {
    reject = 1;
  }
  var bloodbag = {
    BLID: null,
    blood_group: req.body.blood_type,
    quantity: req.body.units,
    available: 1,
    rejected: reject,
    DonorID: req.body.donor,
  };
  {
    await db.query(
      "INSERT INTO blood_bag SET ?",
      bloodbag,
      function (err, results, fields) {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.send("Blood Bag added");
        }
      }
    );
  }
});

router.get("/final", async (req, res) => {
  res.redirect("/data-entry");
});
module.exports = router;
