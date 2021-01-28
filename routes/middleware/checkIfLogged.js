const session = require("express-session");

const checkIfLogged = (req, res, next) => {
  if (!req.session.admin) {
    res.redirect("/user/login");
  } else {
    next();
  }
};

module.exports = checkIfLogged;
