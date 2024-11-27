const multer = require("multer");

const {
  validatePictures,
  validateDuplicatePictures,
} = require("../validation/imageValidation");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
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
      if (req.files && req.files.length > 0) {
        validatePictures(req.files, req.body.existingImages ? true : false);
        validateDuplicatePictures(req.files);
      }
      next();
    } catch (validationError) {
      return res.status(400).json({
        msg: "Image upload failed from image controller",
        error: validationError.message,
      });
    }
  });
}

module.exports = {
  uploadImages,
};
