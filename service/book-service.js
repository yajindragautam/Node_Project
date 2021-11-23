const mongoose = require("mongoose");
const Book = mongoose.model("Book");

exports.getAllBooks = async () => {
  return Book.find({});
};

// Store New Created  Book
exports.storeNewBook = async (book) => {
  return Book.create(book);
}

// EXPORTING
