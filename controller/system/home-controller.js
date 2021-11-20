const userService = require("../../service/user-service");

// Example
exports.home = (req, res) => {
  res.render("pages/home", {
    pageTitle: "Home Page",
    pageBody: "This is example of home page",
  });
};

// Register View Controller
exports.registerView = (req, res) => {
  res.render("pages/register", { pageTitle: "Register Page" });
};

// Register Controller
exports.register = async (req, res) => {
  try {
    await userService.create(req.body);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
