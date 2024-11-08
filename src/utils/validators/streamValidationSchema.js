const Joi = require("joi");

const streamValidationSchema = Joi.object({
    title: Joi.string().min(3).max(100).required().messages({
      'string.empty': 'Title is required.',
      'string.min': 'Title must be at least 3 characters long.',
      'string.max': 'Title must be less than or equal to 100 characters.',
    }),
    description: Joi.string().min(10).max(500).required().messages({
      'string.empty': 'Description is required.',
      'string.min': 'Description must be at least 10 characters long.',
      'string.max': 'Description must be less than or equal to 500 characters.',
    }),
    streamKey: Joi.string().min(10).max(50).required().messages({
      'string.empty': 'Stream key is required.',
      'string.min': 'Stream key must be at least 10 characters long.',
      'string.max': 'Stream key must be less than or equal to 50 characters.',
    }),
    tags: Joi.array().items(Joi.string()).max(10).messages({
      'array.max': 'You can specify up to 10 tags only.',
    }),
    location: Joi.string().min(3).max(100).messages({
      'string.min': 'Location must be at least 3 characters long.',
      'string.max': 'Location must be less than or equal to 100 characters.',
    }),
  });
  
////////////////////////////////////////////////////////////////////////////////////////////////////////
//USER REGISTRATION
const liveStreamValidator = (req, res, next) => {
  const { error } = streamValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details.map((detail) => detail.message).join(", "),
      statusCode: 400,
    });
  }
  next();
};
module.exports = { liveStreamValidator };
