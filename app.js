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
app.use("/user", require("./routes/user"));
app.use("/request", require("./routes/request"));

server.listen(3000 || PORT, function (req, res) {
  console.log("Running on Server");
});

//git push -u -f origin master
