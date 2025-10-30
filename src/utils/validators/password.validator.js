const Joi = require("joi");

const resetPasswordSchema = Joi.object({
  oldPassword: Joi.string().min(8).max(30).required(),
  newPassword: Joi.string().min(8).max(30).required(),
});

exports.userResetPasswordValidator = (req, res, next) => {
  // Check if body exists
  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Request body is required",
      statusCode: 400,
    });
  }

  const { error } = resetPasswordSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details.map((detail) => detail.message).join(", "),
      statusCode: 400,
    });
  }
  next();
};
