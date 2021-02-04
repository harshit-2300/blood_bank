const session = require("express-session");

const checkIfdataEntry = (req, res, next) => {
  if (req.session.user_type == "normal") {
    res.redirect("/");
  } else {
    next();
  }
};

module.exports = checkIfdataEntry;
