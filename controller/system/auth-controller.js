const userService = require("../../service/user-service");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = mongoose.model("User");


// Register View Controller
exports.registerView = (req, res) => {
  res.render("pages/register", { pageTitle: "Register Page" });
};

// Register Controller
exports.register = async (req, res) => {
  try {
    const user = await userService.create(req.body);
    req.flash("alert", {
      type: "success",
      message: "User created successfully!",
    });
    res.redirect("/");
  } catch (error) {
    req.flash("alert", {
      type: "danger",
      message: "User Un - successfully!",
    });
    res.redirect("/");
    // console.log(error);
  }
};

// lOGIN
exports.loginView = (req, res) => {
  res.render("pages/login", { pageTitle: "Login Page" });
};
// Login Controller
exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    req.flash("alert", {
      type: "danger",
      message: "Invalid Credentials",
    });
    return res.redirect("back");
  }
  const matchPassword = await bcrypt.compare(req.body.password, user.password);
  if (!matchPassword) {
    req.flash("alert", {
      type: "danger",
      message: "Invalid Credentials",
    });
    return res.redirect("back");
  }
  // Create a session
  req.session.user = user;
  req.session.isLogged = true;

  req.flash("alert", {
    type: "success",
    message: "Login Successfully",
  });
  return res.redirect("/dashbord");
};

// Logout Controller
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
