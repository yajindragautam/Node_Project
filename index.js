let ejs = require("ejs");
require("dotenv").config();
require("./config/database");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const apiRoute = require("./routes/api");
const webRoute = require("./routes/web");
const logMiddleware = require("./middleware/logger");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

// For JSON
app.use(bodyParser.json());
// For Form Data

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// Templating engine
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    name: "session",
    saveUninitialized: true,
    // cookie: { secure: true },
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.errors = req.flash("errors")[0] || {};
  res.locals.oldData = req.flash('oldData')[0] || {}
  res.locals.alert = req.flash("alert")[0];
  res.locals.flash = req.flash();
   res.locals.user = req.session && req.session.user ? req.session.user: null;
   res.locals.isLogged = req.session && req.session.isLogged ? true : false;
  // console.log(res.locals);
  next();
});

//middleware - Middleware is used to intercept req , res
app.use((req, res, next) => {
  //console.log("This is middleware! Body: ", req.body);
  // res.json({message: 'returned from middleware!'})
  next();
});
// Middleware to Serve Static Files
app.use(express.static("public"));

app.use("/api", apiRoute);
app.use("/", webRoute);
//app.use(logMiddleware);
//crud

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
