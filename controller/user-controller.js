const mongoose = require('mongoose');
const User = mongoose.model("User");



const getAllUser = async(req, res) => {
    const users = await User.find();
    res.json(users);
};

const createUser = async(req, res) => {
  // const user = new User(req.body); - EASY TO DO
  const {email, password,name, status, phone, address, age} = req.body;
  const user = new User({ email, password, name, status, phone, address, age });
  await user.save();
  res.status(201).json(req.body);
};


const getUserById = (req, res) => {
  let user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) res.status(404).send("The user with the given ID was not found.");
  res.json(user);
};

const updateUser = (req, res) => {
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
  res.json(req.body);
};

const deleteUser = (req, res) => {
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
}; 

module.exports = {
  getAllUser,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  
};
