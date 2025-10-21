const Joi = require("joi");

const channelSchema = Joi.object({
  channelName: Joi.string().min(3).max(100).required().messages({
    "string.base": "channel Name must be a string",
    "string.empty": "Channel name cannot be empty",
    "any.required": "Channel name is required",
  }),
});

const channelValidator = (req, res, next) => {
  const { error } = channelSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details.map((detail) => detail.message).join(", "),
      statusCode: 400,
    });
  }
  next();
};

module.exports = channelValidator;
