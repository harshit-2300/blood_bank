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



router.post("/registeration-step1", async (req, res) => {
    var today = new Date();
    var users = {
        blood_group: req.body.blood_type,
        gender: req.body.gender,
        weight:req.body.weight,
        height:req.body.height,
        next_donation_date:today,
        previous_sms_date:today,
      };
      console.log(users);

  await db.query(
    "INSERT INTO donor SET ?",
    users,
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.send("error");
      } else {
        res.render("/forms/pretest-step2");
      }
    }
  );
});
module.exports = router;
