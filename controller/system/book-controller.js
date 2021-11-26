const BookService = require("../../service/book-service");
const fs = require("fs");

exports.index = async (req, res) => {
  const books = await BookService.getAllBooks({author: req.session.user._id});
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

// Book Edit View
exports.editView = async (req, res) => {
  const book = await BookService.getBookById(req.params.id);
  if (!book) {
    return res.render("/errors/404");
  }
  return res.render("pages/books/edit", {
    pageTitle: "Edit Book",
    book,
  });
};

exports.update = async (req, res) => {
  try {
    const book = await BookService.getBookById(req.params.id);
    if (!book) {
      alert("Book not found");
      return res.render("pages/errors/404");
    }
    book.title = req.body.title;
    book.description = req.body.description;
    if (req.file) {
      //delete old image
      const oldImage = `public/uploads/${book.image}`;
      fs.unlinkSync(oldImage);
      book.image = req.file.filename;
    }
    book.updatedAt = new Date();
    await book.save();
    req.flash("alert", {
      type: "success",
      message: "Book updated successfully!",
    });
    res.redirect("/books");
  } catch (error) {
    //console.log(error);
    return res.render("pages/errors/404");
  }
};

exports.view = (req, res) => {};

exports.destroy = async (req, res) => {
  try {
    const book = await BookService.getBookById(req.params.id);
    if (!book) {
      return res.render("pages/errors/404");
    }

    const oldImage = `public/uploads/${book.image}`;
    fs.unlinkSync(oldImage);
    await book.remove();
    req.flash("alert", {
      type: "success",
      message: "Book deleted successfully!",
    });
    res.redirect("/books");
  } catch (error) {}
};

// Create Books View
exports.createView = (req, res) => {
  return res.render("pages/books/create", {
    pageTitle: "Create Book",
    book: {},
  });
};

// 404 Page
exports.notFound = (req, res) => {
  return res.render("pages/errors/404");
};
