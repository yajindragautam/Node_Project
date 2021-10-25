const mongoose = require("mongoose");

// ANONYMOUS - functions
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully !...");
  } catch (e) {
    console.error("Error during connection with mongo", e);
  }
})();

require("../model/user");
