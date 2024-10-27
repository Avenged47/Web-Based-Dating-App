// uploadController.js
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Define the destination directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

function uploadImages(req, res, next) {
  upload.array("image")(req, res, function (err) {
    if (err) {
      return res
        .status(400)
        .json({ msg: "Image upload failed", error: err.message });
    }
    next();
  });
}

module.exports = {
  uploadImages,
};
