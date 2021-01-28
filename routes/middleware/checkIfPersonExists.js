const bodyParser = require("body-parser");
const db = require("../../config/db.js");
const checkIfPersonExists = async (req, res, next) => {
  await db.query(
    "SELECT * FROM people WHERE email = ?",
    req.body.email,
    function (error, results, fields) {
      if (results.length) {
        req.session.reg = true;
        res.redirect("/admin/add-people");
      } else {
        next();
      }
    }
  );
};
module.exports = checkIfPersonExists;