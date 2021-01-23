const express = require("express");
const mysql = require("mysql");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const db = require("../config/db.js");
app.use(bodyParser.json());

const fs = require("fs");
const api = require("../api/api.js");

const PORT = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
const router = express.Router();
const upload = require("./middleware/multerMiddleware");

var cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: api.cloud_name,
  api_key: api.API_Key,
  api_secret: api.API_secret,
});

router.post("/submit", upload.array("image"), async (req, res) => {
  console.log(req.files);
  var imgurl = await cloudinary.uploader.upload(
    req.files[0].path,
    function (error, result) {
      if (error) {
        console.log(error);
      }
    }
  );
  var url = imgurl.url;
  var request = {
    blood_group: req.body.blood_type,
    quantity: req.body.units,
    PID: req.session.user,
    accepted: 0,
    uploaded_file: url,
  };

  await db.query(
    "INSERT INTO request SET ?",
    request,
    function (error, results, fields) {
      if (error) {
        console.log(error);
      } else {
        res.send("<h1>Request submitted</h1>");
      }
    }
  );
});
module.exports = router;
