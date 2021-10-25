const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Required to ENCRYPT PASS
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  age: {
    type: Number,
  },
  status: {
    type: Boolean,
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

// Scema Middleware to Incript PASSWPRD
UserSchema.pre("save", async function (next) {
  // console.log("pre save", this.password);
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// Exporting
module.exports = mongoose.model("User", UserSchema);
