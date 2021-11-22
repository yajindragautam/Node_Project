const mongoose = require("mongoose");
const Book = mongoose.model("Book");

exports.getAllBooks = async () => {
  return Book.find({});
};

// EXPORTING
