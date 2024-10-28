const Joi = require("joi");

const today = new Date();
const minAgeDate = new Date(today.setFullYear(today.getFullYear() - 18));

const profileSchema = Joi.object({
  firstName: Joi.string().min(1).required().messages({
    "string.base": `"firstName" should be a type of 'text'`,
    "string.empty": `"firstName" cannot be an empty field`,
    "any.required": `"firstName" is a required field`,
  }),
  lastName: Joi.string().min(1).required().messages({
    "string.base": `"lastName" should be a type of 'text'`,
    "string.empty": `"lastName" cannot be an empty field`,
    "any.required": `"lastName" is a required field`,
  }),
  dob: Joi.date().iso().required().max(minAgeDate).messages({
    "date.base": `"dob" should be a valid date`,
    "date.max": `"You must be at least 18 years old"`,
    "any.required": `"dob" is a required field`,
  }),
  gender: Joi.string().required().messages({
    "string.base": `"gender" should be a type of 'text'`,
    "string.empty": `"gender" cannot be an empty field`,
    "any.required": `"gender" is a required field`,
  }),
  sexualOrientation: Joi.string().required().messages({
    "string.base": `"sexualOrientation" should be a type of 'text'`,
    "string.empty": `"sexualOrientation" cannot be an empty field`,
    "any.required": `"sexualOrientation" is a required field`,
  }),
  relationshipStatus: Joi.string().required().messages({
    "string.base": `"relationshipStatus" should be a type of 'text'`,
    "string.empty": `"relationshipStatus" cannot be an empty field`,
    "any.required": `"relationshipStatus" is a required field`,
  }),
  interestedIn: Joi.string().required().messages({
    "string.base": `"interestedIn" should be a type of 'text'`,
    "string.empty": `"interestedIn" cannot be an empty field`,
    "any.required": `"interestedIn" is a required field`,
  }),
  interests: Joi.array()
    .items(Joi.string().trim().min(1))
    .min(5)
    .required()
    .messages({
      "array.base": `"interests" should be an array of strings`,
      "array.min": `"You must choose at least 5 interests"`,
      "any.required": `"interests" is a required field`,
    }),
  dislikes: Joi.array().items(Joi.string().trim().min(1)).min(5).messages({
    "array.base": `"dislikes" should be an array of strings`,
    "array.min": `"You must choose at least 5 dislikes"`,
  }),
});

function validateProfileData(data) {
  return profileSchema.validate(data, { abortEarly: false });
}

module.exports = {
  validateProfileData,
};
