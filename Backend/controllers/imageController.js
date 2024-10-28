const multer = require("multer");
const path = require("path");
const {
  validatePictures,
  validateDuplicatePictures,
} = require("../validation/imageValidation");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Define the destination directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Create unique filenames
  },
});

const upload = multer({ storage: storage });

function uploadImages(req, res, next) {
  upload.array("images")(req, res, function (err) {
    if (err) {
      return res
        .status(400)
        .json({ msg: "Image upload failed", error: err.message });
    }

    try {
      validatePictures(req.files);
      validateDuplicatePictures(req.files);

      next();
    } catch (validationError) {
      return res
        .status(400)
        .json({ msg: "Image upload failed", error: validationError.message });
    }
  });
}

module.exports = {
  uploadImages,
};
