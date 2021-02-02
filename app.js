const express = require("express");
const mysql = require("mysql");
const app = express();
const ejs = require("ejs");
const session = require("express-session");
const db = require("./config/db.js");
const PORT = process.env.PORT;
const http = require("http");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json({ extended: false }));
const server = http.createServer(app);

app.use(
  session({
    secret: "2C44-4D44-WppQ38S",
    resave: true,
    saveUninitialized: true,
  })
);

//render home.ejs with passing a variable
app.get("/", async (req, res) => {
  flag = 0;
  if (typeof req.session.success === "undefined" || req.session.success == 0)
    flag = 0;
  else flag = 1;
  req.session.success = 0;
  console.log(flag);
  res.render("index", { logged: req.session.admin, flag: flag });
});

app.get("/data-entry", async (req, res) => {
  res.render("forms/index", { logged: req.session.admin });
});

app.get("/registeration-step1.html", async (req, res) => {
  console.log(req.session.user_exist);
  var user = req.session.user_exist;
  var p = 0;
  if (typeof user === "undefined") p = 1;
  if (p)
    res.render("forms/registeration-step1", {
      logged: req.session.admin,
      full_name: "",
      email: "",
      phone_number: "",
    });
  else
    res.render("forms/registeration-step1", {
      logged: req.session.admin,
      full_name: user[0].full_name,
      email: user[0].email,
      phone_number: user[0].phone_number,
    });
});

app.get("/pretest-step2.html", async (req, res) => {
  res.render("forms/pretest-step2", {
    logged: req.session.admin,
    did: req.session.did,
  });
});

app.get("/donation-step3.html", async (req, res) => {
  console.log(req.session.name);

  
  res.render("forms/donation-step3", {
    logged: req.session.admin,
  });
});

app.get("/index.html", async (req, res) => {
  flag = 0;
  if (typeof req.session.success === "undefined" || req.session.success == 0)
    flag = 0;
  else flag = 1;
  req.session.success = 0;
  res.render("index", { logged: req.session.admin, flag: flag });
});

app.get("/about.html", async (req, res) => {
  res.render("about", { logged: req.session.admin });
});

app.get("/forms/profile.html", async (req, res) => {
  res.render("forms/profile", { logged: req.session.admin });
});

app.get("/blog.html", async (req, res) => {
  res.render("blog", { logged: req.session.admin });
});

app.get("/blog_details.html", async (req, res) => {
  res.render("blog_details", { logged: req.session.admin });
});

app.get("/donate_now.html", async (req, res) => {
  res.render("donate_now", { logged: req.session.admin });
});

app.get("/services.html", async (req, res) => {
  res.render("services", { logged: req.session.admin });
});

app.get("/contact.html", async (req, res) => {
  res.render("contact", { logged: req.session.admin });
});

app.get("/request_now.html", async (req, res) => {
  res.render("request_now", { logged: req.session.admin });
});

app.get("/admin/index_admin.html", async (req, res) => {
  res.render("admin/index_admin", { logged: req.session.admin });
});

app.get("/admin/admin-people.html", async (req, res) => {
  await db.query("SELECT * FROM people", function (error, result, fields) {
    if (error) {
      console.log(error);
    } else {
      var peoples = result;
      res.render("admin/admin-people", {
        logged: req.session.admin,
        peoples: result,
      });
    }
  });
});

app.get("/admin/admin-request.html", async (req, res) => {
  await db.query(
    "SELECT REID,full_name, request.blood_group, quantity , request_date,accepted FROM people , request WHERE people.PID = request.PID",
    function (error, result, fields) {
      if (error) {
        console.log(error);
      } else {
        var requests = result;
        console.log(result);
        res.render("admin/admin-request", {
          logged: req.session.admin,
          requests: result,
          status: "pending",
        });
      }
    }
  );
});

app.get("/admin/admin-camps.html", async (req, res) => {
  await db.query(
    "SELECT * FROM blood_donation_camp",
    function (error, result, fields) {
      if (error) {
        console.log(error);
      } else {
        var camps = result;
        res.render("admin/admin-camps", {
          logged: req.session.admin,
          camps: result,
        });
      }
    }
  );
});

app.get("/admin/full-camps.html", async (req, res) => {
  res.render("admin/full-camps", { logged: req.session.admin });
});

app.get("/admin/add-camp.html", async (req, res) => {
  res.render("admin/add-camp", { logged: req.session.admin });
});

app.get("/admin/full-people.html/:id", async (req, res) => {
  var pid = req.params["id"];
  await db.query(
    "SELECT * FROM people WHERE PID=?",
    pid,
    function (error, result, fields) {
      if (error) {
        console.log(error);
      } else {
        var peoples = result;

        res.render("admin/full-people", {
          logged: req.session.admin,
          peoples: result,
        });
      }
    }
  );
});

app.get("/admin/add-people.html", async (req, res) => {
  res.render("admin/add-people", { logged: req.session.admin });
});

// app.get("/admin/showrequest", async (req, res) => {
//   res.redirect("/showrequest/");
// });
app.get("/showrequest/:id", async (req, res) => {
  console.log(req.params.id);
  {
    await db.query(
      "SELECT * FROM request WHERE REID = ?",
      1,
      function (error, result, fields) {
        if (error) {
          console.log(error);
        } else {
          console.log(result);
          res.render("admin/full-request", { request: result });
        }
      }
    );
  }
});

app.get("/admin/admin-donation.html", async (req, res) => {
  res.render("admin/admin-donation", { logged: req.session.admin });
});

app.get("/admin/admin-bloodbank.html", async (req, res) => {
  res.render("admin/admin-bloodbank", { logged: req.session.admin });
});

app.get("/admin/add-bloodbank.html", async (req, res) => {
  res.render("admin/add-bloodbank", { logged: req.session.admin });
});

app.get("/admin/admin-bloodbag.html", async (req, res) => {
  res.render("admin/admin-bloodbag", { logged: req.session.admin });
});

app.get("/admin/full-bloodbag.html", async (req, res) => {
  res.render("admin/full-bloodbag", { logged: req.session.admin });
});

app.use("/user", require("./routes/user"));

app.use("/request", require("./routes/request"));

app.use("/donate", require("./routes/donate"));

app.use("/admin", require("./routes/admin"));

server.listen(3000 || PORT, function (req, res) {
  console.log("Running on Server");
});

//git push -u -f origin master
