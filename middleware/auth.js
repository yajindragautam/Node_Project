const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const verifyToken = async (req, res, next) => {
  //console.log(req.headers);
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    return res.status(401).json({
      message: "Token Not found..!",
    });
  }
  let token = bearerToken.split(" ");
  if (token.length !== 2) {
    return res.status(403).json({
      message: "Authorization token must be provided",
    });
  }
  try {
    let decodedToken = jwt.verify(token[1], process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }
};
// Export
module.exports = verifyToken;
