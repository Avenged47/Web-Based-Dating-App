const Joi = require("joi");

const validateImages = (images) => {
  const schema = Joi.array()
    .items(Joi.string().trim().min(1))
    .min(4)
    .unique((a, b) => a === b)
    .messages({
      "array.base": `"images" should be an array of strings`,
      "array.min": `"You must upload at least 4 images`,
      "array.unique": `"Images should not contain duplicates`,
    });

  return schema.validate(images);
};

module.exports = {
  validateImages,
};
