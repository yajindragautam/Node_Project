const BookService = require("../../service/book-service");

exports.index = async (req, res) => {
  const books = await BookService.getAllBooks();
  res.render("pages/books/index", {
    pageTitle: "Books Management",
    books,
  });
};

exports.store = (req, res) => {};

exports.update = (req, res) => {};

exports.view = (req, res) => {};

exports.destroy = (req, res) => {};

// Create Books View
exports.createView = (req, res) => {
  return res.render("pages/book/create");
};
