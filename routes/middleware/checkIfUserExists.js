const bodyParser = require("body-parser");
const db = require("../../config/db.js");
const checkIfUserExists = async (req, res, next) => {
  await db.query(
    "SELECT * FROM people WHERE email = ?",
    req.body.email,
    function (error, results, fields) {
      if (results.length) {
        req.session.reg = true;
        res.redirect("/user/signup");
      } else {
        next();
      }
    }
  );
};
module.exports = checkIfUserExists;
