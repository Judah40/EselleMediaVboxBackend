const Joi = require("joi");

const MessageSchema = Joi.object({
  text: Joi.string().min(1).max(500).required().messages({
    "string.base": "Text must be a string.",
    "string.empty": "Text cannot be empty.",
    "string.min": "Text must be at least 1 character long.",
    "string.max": "Text must not exceed 500 characters.",
    "any.required": "Text is required.",
  }),

  name: Joi.string()
    .min(3)
    .max(100)
    .regex(/^[a-zA-Z\s]+$/) // Optional: Restrict to letters and spaces
    .required()
    .messages({
      "string.base": "Name must be a string.",
      "string.empty": "Name cannot be empty.",
      "string.min": "Name must be at least 3 characters long.",
      "string.max": "Name must not exceed 100 characters.",
      "string.pattern.base": "Name must only contain letters and spaces.",
      "any.required": "Name is required.",
    }),
});

// Example validation functionconst CommentValidator = (req, res, next) => {
    const validateMessageSchema = (req, res, next) => {
        const { error } = MessageSchema.validate(req.body);
        if (error) {
          return res.status(400).json({
            status: "error",
            message: error.details.map((detail) => detail.message).join(", "),
            statusCode: 400,
          });
        }
        next();
      };
module.exports = { validateMessageSchema };
