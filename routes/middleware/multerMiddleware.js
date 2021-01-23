const multer = require("multer");
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({
  // dest:'name',
  storage,
  // fileFilter(req,res,cal)
});

module.exports = upload;
