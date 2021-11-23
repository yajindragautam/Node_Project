const { checkSchema } = require("express-validator");

const BookValidation = checkSchema({
  title: {
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: "Title is required",
    },
    trim: true,
  },
  description: {
    isLength: {
      options: { min: 1, max: 255 },
      errorMessage: "Description is required",
    },
    trim: true,
  },
});

// Export the validation
module.exports = BookValidation;
