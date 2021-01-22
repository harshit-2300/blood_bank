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
  res.render("index");
});

app.get("/index.html", async (req, res) => {
  res.render("index");
});

app.get("/about.html", async (req, res) => {
  res.render("about");
});

app.get("/forms/profile.html", async (req, res) => {
  res.render("forms/profile");
});

app.get("/blog.html", async (req, res) => {
  res.render("blog");
});

app.get("/blog_details.html", async (req, res) => {
  res.render("blog_details");
});

app.get("/donate_now.html", async (req, res) => {
  res.render("donate_now");
});

app.get("/services.html", async (req, res) => {
  res.render("services");
});

app.get("/contact.html", async (req, res) => {
  res.render("contact");
});

app.get("/request_now.html", async (req, res) => {
  res.render("request_now");
});

app.use("/user", require("./routes/user"));

server.listen(3000 || PORT, function (req, res) {
  console.log("Running on Server");
});

//git push -u -f origin master
