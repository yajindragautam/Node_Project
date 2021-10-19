const express = require("express");
const router = express.Router();

// CROU IN ARRAY
let users = [];

// get all users, Request Method: Get
router.get("/users", (req, res) => {
  res.json(users);
});

// create new users, Request Method: POST
router.post("/users", (req, res) => {
  users.push(req.body);
  res.status(201).json(req.body);
});

// get user by id, Request Method: Get
router.get("/users/:id", (req, res) => {
  let user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({
      error: "The user with the given ID was not found.",
    });
  }
  res.json(user);
});

//
router.put("/users/:id", (req, res) => {
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
});

// DELETE
router.delete("/users/:id", (req, res) => {
  let userIndex = user.findIndex((user) => user.id === parseInt(req.params.id));
  if (userIndex > users.length) {
    return res.status(404).json({
      error: "User Not Found",
    });
  }
  users.splice(userIndex, 1);
  res.status(204).json({ message: "The user has been deleted" });
});

module.exports = router;
