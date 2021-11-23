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
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
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

// Another way to Populate
function populateAuthor(next) {
  this.populate("author");
  next();
}
BookSchema.pre("find", populateAuthor);
BookSchema.pre("findOne", populateAuthor);

// Exporting
module.exports = mongoose.model("Book", BookSchema);
