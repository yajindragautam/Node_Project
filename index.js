require("dotenv").config();
require('./config/database');
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const route = require("./routes/index");
const logMiddleware = require("./middleware/logger");

app.use(bodyParser.json());

//middleware - Middleware is used to intercept req , res
app.use((req, res, next) => {
  console.log("This is middleware! Body: ", req.body);
  // res.json({message: 'returned from middleware!'})
  next();
});

app.use("/", route);
//app.use(logMiddleware);
//crud

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
