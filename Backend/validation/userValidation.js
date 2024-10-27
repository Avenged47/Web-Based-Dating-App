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
    "date.max": `"You must be at least 18 years old`,
    "any.required": `"dob" is a required field`,
  }),
  gender: Joi.string().valid("Male", "Female", "Other").required().messages({
    "any.only": `"gender" must be one of [Male, Female, Other]`,
    "any.required": `"gender" is a required field`,
  }),
  sexualOrientation: Joi.string()
    .valid(
      "Heterosexual",
      "Homosexual",
      "Bisexual",
      "Other",
      "Straight",
      "Pansexual",
      "Asexual"
    )
    .required()
    .messages({
      "any.only": `"sexualOrientation" must be one of [Heterosexual, Homosexual, Bisexual, Other, Straight, Pansexual, Asexual]`, // Update error message accordingly
      "any.required": `"sexualOrientation" is a required field`,
    }),
  relationshipStatus: Joi.string()
    .valid("Single", "In a relationship", "Married", "Divorced", "Widowed")
    .required()
    .messages({
      "any.only": `"relationshipStatus" must be one of [Single, In a relationship, Married, Divorced, Widowed]`,
      "any.required": `"relationshipStatus" is a required field`,
    }),
  interestedIn: Joi.string()
    .valid("Male", "Female", "Both", "Other")
    .required()
    .messages({
      "any.only": `"interestedIn" must be one of [Male, Female, Both, Other]`,
      "any.required": `"interestedIn" is a required field`,
    }),
  interests: Joi.array()
    .items(Joi.string().trim().min(1))
    .min(5)
    .required()
    .messages({
      "array.base": `"interests" should be an array of strings`,
      "array.min": `"You must choose at least 5 interests`,
      "any.required": `"interests" is a required field`,
    }),
  dislikes: Joi.array().items(Joi.string().trim().min(1)).min(5).messages({
    "array.base": `"dislikes" should be an array of strings`,
    "array.min": `"You must choose at least 5 dislikes`,
    "any.required": `"dislikes" is a required field`,
  }),
});

function validateProfileData(data) {
  return profileSchema.validate(data, { abortEarly: false });
}

module.exports = {
  validateProfileData,
};
