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

// For JSON
app.use(bodyParser.json());
// For Form Data
app.use(bodyParser.urlencoded({ extended: flase }));
app.use(cookieParser());
// Templating engine
app.set("view engine", "ejs");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    name: "session",
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

//middleware - Middleware is used to intercept req , res
app.use((req, res, next) => {
  console.log("This is middleware! Body: ", req.body);
  // res.json({message: 'returned from middleware!'})
  next();
});

app.use("/api", apiRoute);
app.use("/", webRoute);
//app.use(logMiddleware);
//crud

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
