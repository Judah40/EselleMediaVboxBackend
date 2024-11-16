const Joi = require("joi");

const commentSchema = Joi.object({
  comment: Joi.string()
    .min(1)
    .max(500) // Adjust max length as needed
    .required()
    .messages({
      "string.empty": "Comment cannot be empty",
      "string.max": "Comment cannot exceed 500 characters",
    }),
  liveId: Joi.string().min(10).max(50).required().messages({
    "string.empty": "liveId key is required.",
    "string.min": "liveId key must be at least 10 characters long.",
    "string.max": "liveId key must be less than or equal to 50 characters.",
  }),
});

//POST VALIDATOR
const CommentValidator = (req, res, next) => {
  const { error } = commentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details.map((detail) => detail.message).join(", "),
      statusCode: 400,
    });
  }
  next();
};
module.exports = { CommentValidator };
