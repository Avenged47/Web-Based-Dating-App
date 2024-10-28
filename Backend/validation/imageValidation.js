// imageValidation.js
function validatePictures(pictures) {
  if (pictures.length < 3) {
    throw new Error("At least 3 files are required");
  }
}

function validateDuplicatePictures(pictures) {
  const filenames = pictures.map((file) => file.originalname);
  if (new Set(filenames).size !== filenames.length) {
    throw new Error("Duplicate files are not allowed");
  }
}

module.exports = {
  validatePictures,
  validateDuplicatePictures,
};
