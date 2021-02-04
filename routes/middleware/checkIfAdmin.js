const session = require("express-session");

const checkIfAdmin = (req, res, next) => {
  if (req.session.user_type != "admin") {
    res.redirect("/");
  } else {
    next();
  }
};

module.exports = checkIfAdmin;
