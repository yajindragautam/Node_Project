const { checkSchema } = require("express-validator");

const loginValidation = checkSchema({
  email: {
    isEmail: {
      errorMessage: "Email is not valid",
    },
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: "Email is required",
    },
    trim: true,
  },
  password: {
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: "Password is required",
    },
    trim: true,
  },
});

// Export the validation
module.exports = loginValidation;
