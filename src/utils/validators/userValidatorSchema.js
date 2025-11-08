const Joi = require("joi");

////////////////////////////////////////////////////////////////////////////////////////////////////////
//USER REGISTRATION VALIDATION SCHEMA
const userSchema = Joi.object({
  firstName: Joi.string().min(3).max(100).required().messages({
    "string.base": "First name must be a string",
    "string.empty": "First name cannot be empty",
    "any.required": "First name is required",
  }),
  middleName: Joi.string().min(3).max(100),
  lastName: Joi.string().min(3).max(100).required().messages({
    "string.base": "Last name must be a string",
    "string.empty": "Last name cannot be empty",
    "any.required": "Last name is required",
  }),
  username: Joi.string().min(3).max(100).required().messages({
    "string.base": "username name must be a string",
    "string.empty": "username name cannot be empty",
    "any.required": "username name is required",
  }),
  dateOfBirth: Joi.date().less(new Date()).required().messages({
    "date.base": "Date of Birth must be a valid date",
    "any.required": "Date of Birth is required",
  }),

  gender: Joi.string().valid("Male", "Female").required().messages({
    "any.only": "Gender must be either Male or Female",
    "any.required": "Gender is required",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),

  address: Joi.string().min(5).max(255).required().messages({
    "string.base": "Address must be a string",
    "string.empty": "Address cannot be empty",
    "any.required": "Address is required",
  }),

  phoneNumber: Joi.string()
    .pattern(/^[+0-9]{10,15}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must be a valid international format (e.g. +123456789)",
      "any.required": "Phone number is required",
    }),

  password: Joi.string().min(8).max(30).required(),
});

//USER PASSWORD SETUP
const passwordSchema = Joi.object({
  password: Joi.string().min(8).max(30).required(),
});

//USER LOGIN VALIDATION SCHEMA
const signInSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),
  password: Joi.string().min(8).max(30).required().messages({
    "string.min": "Password must be at least 8 characters long",
    "string.max": "Password must not exceed 30 characters",
    "any.required": "Password is required",
  }),
});

////////////////////////////////////////////////////////////////////////////////////////////////////////
//USER REGISTRATION
const userDetailsValidator = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details.map((detail) => detail.message).join(", "),
      statusCode: 400,
    });
  }
  next();
};
//PASSWORD SETUP
const userPasswordValidator = (req, res, next) => {
  const { error } = passwordSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details.map((detail) => detail.message).join(", "),
      statusCode: 400,
    });
  }
  next();
};

//USER LOGIN
const userLoginValidator = (req, res, next) => {
  const { error } = signInSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details.map((detail) => detail.message).join(", "),
      statusCode: 400,
    });
  }
  next();
};
////////////////////////////////////////////////////////////////////////////////////////////////////////
//EXPORT
module.exports = {
  userDetailsValidator,
  userPasswordValidator,
  userLoginValidator,
};
