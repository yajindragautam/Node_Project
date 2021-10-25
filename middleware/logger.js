exports.logRequest = (req, res, next) => {
  console.log(`${req.method} ${req.protocol}: ${req.get("host")}`);
  next();
};
