const Joi = require("joi");

const postSchema = Joi.object({
  title: Joi.string()
    .required() // Ensures content is required and is a string
    .messages({
      "string.base": "Content must be a text.",
      "any.required": "Content is required.",
    }),

  description: Joi.string()
    .max(255) // Optional, but must not exceed 255 characters
    .allow(null, "")
    .messages({
      "string.max": "Caption must not exceed 255 characters.",
    }),

  genre: Joi.array()
    .items(Joi.string().max(30)) // Array of strings, each string max 30 chars
    .max(10) // Maximum of 10 tags allowed
    .messages({
      "array.base": "Tags must be an array of strings.",
      "array.max": "You can specify up to 10 tags.",
    }),

  location: Joi.string()
    .max(100) // Optional, max 100 characters
    .allow(null, "")
    .messages({
      "string.max": "Location must not exceed 100 characters.",
    }),
});

//POST VALIDATOR
const postValidator = (req, res, next) => {
  const { error } = postSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details.map((detail) => detail.message).join(", "),
      statusCode: 400,
    });
  }
  next();
};
module.exports = { postValidator };
