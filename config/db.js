const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "blood_bank",
});
db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected ");
  }
});
module.exports = db;
