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
    
    if(req.body.submit=='update'){
        await db.query(
            "UPDATE request SET blood_group=?,quantity=?,accepted=? WHERE REID=? ;",
            [
              req.body.blood_group,
              req.body.quantity,
              req.body.status,
              req.body.REID,
            ],
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
    }
    else
    {
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
    console.log("submit=",req.body.submit);
    console.log(req.body);
    
    
} ) 

module.exports = router;