const bodyParser = require("body-parser");
const db = require("../../config/db.js");
const checkIfPersonExists = async (req, res, next) => {
  await db.query(
    "SELECT * FROM people WHERE camp_start BETWEEN req.body.start_date AND req.body.end_date OR camp_end BETWEEN req.body.start_date AND req.body.end_date ",
    req.body.email,
    function (error, results, fields) {
      if (results.length) {
        req.session.reg = true;
        res.redirect("/admin/add-camp");
      } else {
        next();
      }
    }
  );
};
module.exports = checkIfCampExists;