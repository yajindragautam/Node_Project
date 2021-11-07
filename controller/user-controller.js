const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");

const getAllUser = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const createUser = async (req, res) => {
  // const user = new User(req.body); - EASY TO DO
  const { email, password, name, status, phone, address, age } = req.body;
  const user = new User({ email, password, name, status, phone, address, age });
  await user.save();
  res.status(201).json(req.body);
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};

const updateUser = async (req, res) => {
  const user = await User.findById(req.params.json);
  if (!user) {
    return res.status(404).json({ error: "ID not found" });
  }
  user.email = req.body.email;
  user.name = req.body.name;
  user.status = req.body.status;
  user.phone = req.body.phone;
  user.address = req.body.address;
  user.age = req.body.age;
  /*
  let userIndex = users.findIndex(
    (user) => user.id === parseInt(req.params.id)
  );
  if (userIndex > users.length) {
    return res.status(404).json({
      error: "User Not Found",
    });
  }
  //users[userIndex] = req.body;   -- Update whole body
  users[userIndex]["name"] = req.body.name;
  users[userIndex]["age"] = req.body.age;
  users[userIndex]["email"] = req.body.email;
  users[userIndex]["address"] = req.body.address;
  res.json(req.body); */
};

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User Not Found" });
  }
  await user.remove();
  return res.status(204).json({ message: "Successfully Deleted" });

  /*
  let userIndex = users.findIndex(
    (user) => users.id === parseInt(req.params.id)
  );
  if (userIndex > users.length) {
    return res.status(404).json({
      error: "User Not Found",
    });
  }
  users.splice(userIndex, 1);
  res.status(204).json({ message: "The user has been deleted" });
  */
};

const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({ error: "Invalid Email or Password" });
  }
  const matchPassword = await bcrypt.compare(req.body.password, user.password);
  if (!matchPassword) {
    return res.status(401).json({ error: "Invalid Email / Password" });
  }
  return res.status(200).json(user);
};

module.exports = {
  getAllUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
};
