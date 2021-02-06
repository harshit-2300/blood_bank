const express = require("express");
const mysql = require("mysql");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const db = require("../config/db.js");
app.use(bodyParser.json());
const getPid = require("./middleware/getPid.js");

const PORT = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
const router = express.Router();
const upload = require("./middleware/multerMiddleware");

router.post("/edit-request", async (req, res) => {
  if (req.body.submit == "update") {
    await db.query(
      "UPDATE request SET blood_group=?,quantity=?,accepted=? WHERE REID=? ;",
      [req.body.blood_group, req.body.quantity, req.body.status, req.body.REID],
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.send("error");
        } else {
          console.log("here at update in request ");
          console.log("Rows affected:", results.affectedRows);
          res.redirect("/admin/admin-request.html");
        }
      }
    );
  } else {
    await db.query(
      "DELETE FROM request WHERE REID=?",
      req.body.REID,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.send("error");
        } else {
          console.log("here at delete in request ");
          console.log("Rows affected:", results.affectedRows);
          res.redirect("/admin/admin-request.html");
        }
      }
    );
  }
  console.log("submit=", req.body.submit);
  console.log(req.body);
});

router.post("/edit-donation", async (req, res) => {
  if (req.body.submit == "update") {
    await db.query(
      "UPDATE donation_record SET BBID=?,blood_type=?,donation_date=? , blood_test1 = ? , blood_test2=?, blood_test3=? WHERE DID=? ;",
      [
        req.body.bbid,
        req.body.blood_type,
        req.body.date,
        req.body.blood_test1,
        req.body.blood_test2,
        req.body.blood_test3,
        req.session.DID,
      ],
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.send("error");
        } else {
          console.log("here at update in request ");
          console.log("Rows affected:", results.affectedRows);
          res.redirect("/admin/admin-donation.html");
        }
      }
    );
  } else {
    await db.query(
      "DELETE FROM donation_record WHERE DID=?",
      req.session.DID,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.send("error");
        } else {
          console.log("here at delete in request ");
          console.log("Rows affected:", results.affectedRows);
          res.redirect("/admin/admin-donation.html");
        }
      }
    );
  }
  console.log("submit=", req.body.submit);
  console.log(req.body);
});

router.post("/edit-camp", async (req, res) => {

  if(req.body.submit=='update'){
      await db.query(
          "UPDATE blood_donation_camp SET camp_start=?,camp_end=?,location=?,comments=? WHERE BDCID=? ;",
          [
            req.body.camp_start,
            req.body.camp_end,
            req.body.location,
            req.body.comments,
            req.body.BDCID,
          ],
          function (error, results, fields) {
            if (error) {
              console.log(error);
              res.send("error");
            } else {
              console.log("here at update in camps ");
              console.log("Rows affected:", results.affectedRows);
              res.redirect("/admin/admin-camps.html");
            }
          }
        );
  }
  else
  {
      await db.query(
          "DELETE FROM blood_donation_camp WHERE BDCID=?",
          req.body.BDCID,
          function (error, results, fields) {
            if (error) {
              console.log(error);
              res.send("error");
            } else {
              console.log("here at delete in camps ");
              console.log("Rows affected:", results.affectedRows);
              res.redirect("/admin/admin-camps.html");
            }
          }
        );
  }
  console.log("submit=",req.body.submit);
  console.log(req.body);


} ) ;

router.post("/edit-people", async (req, res) => {

  if(req.body.submit=='update'){
      await db.query(
          "UPDATE people SET full_name=?,blood_group=?,DOB=?,verified=? WHERE PID=? ;",
          [
            req.body.full_name,
            req.body.blood_group,
            req.body.dob,
            req.body.otp,
            req.body.PID,
          ],
          function (error, results, fields) {
            if (error) {
              console.log(error);
              res.send("error");
            } else {
              console.log("here at update in people ");

              console.log("Rows affected:", results.affectedRows);
               db.query(
                "UPDATE donor SET height=?,weight=? WHERE PID=? ;",
                [
                  req.body.height,
                  req.body.weight,                  
                  req.body.PID,
                ],
                function (error, results, fields) {
                  if (error) {
                    console.log(error);
                    res.send("error");
                  } else {
                    console.log("here at update in people ");
                    console.log("Rows affected:", results.affectedRows);
                    res.redirect("/admin/admin-people.html");
                  }
                }
              );
            
            }
          }
        );
  }
  else
  {
      await db.query(
          "DELETE FROM people WHERE PID=?",
          req.body.PID,
          function (error, results, fields) {
            if (error) {
              console.log(error);
              res.send("error");
            } else {
              console.log("here at delete in people ");
              console.log("Rows affected:", results.affectedRows);
              res.redirect("/admin/admin-people.html");
            }
          }
        );
  }
  console.log("submit=",req.body.submit);
  console.log(req.body);


} ) ;

module.exports = router;
