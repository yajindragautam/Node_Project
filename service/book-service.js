const mongoose = require("mongoose");
const Book = mongoose.model("Book");

exports.getAllBooks = async (condition = {}) => {
  return Book.find(condition);
};

// Store New Created  Book
exports.storeNewBook = async (book) => {
  return Book.create(book);
}

// Edit Book
exports.getBookById = async (id) => {
  return Book.findById(id);
}

// EXPORTING
