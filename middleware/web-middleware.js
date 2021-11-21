//Middleware To Check User Login Or Not

const checkLoggedInMiddleware = (req, res, next) => {
  if (req.session.isLogged) {
    next();
    return;
  } else {
    req.flash("alert", {
      type: "danger",
      message: "You must have to logged in First",
    });
    return res.redirect("/login");
  }
};

// Exporting
module.exports = checkLoggedInMiddleware;
