const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Required to ENCRYPT PASS
const { Schema } = mongoose;

const BookSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref='User'
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
});


// Exporting
module.exports = mongoose.model("Book", BookSchema);
