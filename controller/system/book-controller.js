const BookService = require("../../service/book-service");

exports.index = async (req, res) => {
  const books = await BookService.getAllBooks();
  res.render("pages/books/index", {
    pageTitle: "Books Management",
    books,
  });
};

exports.store = async (req, res) => {
 //console.log(req.file, req.body);

 // console.log("Store rEQUESTED...........1");
  const data = {
    title: req.body.title,
    description: req.body.description,
    image: req.file ? req.file.filename : null,
    createdAt: new Date(),
    author: req.session.user._id,
  };
  await BookService.storeNewBook(data);
  req.flash("alert", {
    type: "success",
    message: "Book created successfully",
  });
  res.redirect("/books");
  //res.json({});
};

exports.update = (req, res) => {};

exports.view = (req, res) => {};

exports.destroy = (req, res) => {};

// Create Books View
exports.createView = (req, res) => {
  return res.render("pages/books/create", {
    pageTitle: "Create Book",
  });
};
