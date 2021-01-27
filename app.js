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
  res.render("index", { logged: req.session.admin });
});

app.get("/data-entry", async (req, res) => {
  res.render("forms/registeration-step1", { logged: req.session.admin });
});

app.get("/registeration-step1.html", async (req, res) => {
  res.render("forms/registeration-step1", { logged: req.session.admin });
});

app.get("/pretest-step2.html", async (req, res) => {
  res.render("forms/pretest-step2", { logged: req.session.admin });
});

app.get("/donation-step3.html", async (req, res) => {
  console.log(req.session.name);
  res.render("forms/donation-step3", {
    data: { logged: req.session.admin, name: "hello" },
  });
});

app.get("/index.html", async (req, res) => {
  res.render("index", { logged: req.session.admin });
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
  res.render("admin/admin-people", { logged: req.session.admin });
});

app.get("/admin/admin-request.html", async (req, res) => {
  res.render("admin/admin-request", { logged: req.session.admin });
});

app.get("/admin/admin-camps.html", async (req, res) => {
  res.render("admin/admin-camps", { logged: req.session.admin });
});

app.get("/admin/full-camps.html", async (req, res) => {
  res.render("admin/full-camps", { logged: req.session.admin });
});

app.get("/admin/full-people.html", async (req, res) => {
  res.render("admin/full-people", { logged: req.session.admin });
});

app.get("/admin/full-request.html", async (req, res) => {
  res.render("admin/full-request", { logged: req.session.admin });
});

app.use("/user", require("./routes/user"));
app.use("/request", require("./routes/request"));
app.use("/donate", require("./routes/donate"));

server.listen(3000 || PORT, function (req, res) {
  console.log("Running on Server");
});

//git push -u -f origin master
