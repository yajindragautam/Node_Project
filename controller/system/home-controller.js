// Example
exports.home = (req, res) => {
  res.render("pages/home", {
    pageTitle: "Home Page",
    pageBody: "This is example of home page",
  });
};

// Dashbord
exports.dashbord = (req, res) => {
  res.render("pages/dashbord", {
    pageTitle: "Dashbord",
    body: "This is our Dashbord",
  });
};
