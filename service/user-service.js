const mongoose = require("mongoose");
const User = mongoose.model('User');

exports.create = async(data) => {
     const { email, password, name, phone, address, age } = data;
     const user = new User({
       email,
       password,
       name,
       phone,
       address,
       age,
     });
     await user.save();
     delete user.password;
     return user;
}