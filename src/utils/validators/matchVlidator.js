const Joi = require("joi");

const matchFormSchema = Joi.object({
  streamName: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
});

// Example validation functionconst CommentValidator = (req, res, next) => {
const validateMatchSchema = (req, res, next) => {
  const { error } = matchFormSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details.map((detail) => detail.message).join(", "),
      statusCode: 400,
    });
  }
  next();
};

module.exports = { validateMatchSchema };
