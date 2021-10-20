const express = require("express");
const router = express.Router();
const userController = require('../controller/user-controller');
const hubbyController = require('../controller/hobby-controller');

// CROU IN ARRAY
let users = [];

// get all users, Request Method: Get
router.get("/users", userController.getAllUser);

// create new users, Request Method: POST
router.post("/users", userController.createUser);

// get user by id, Request Method: Get
router.get("/users/:id", userController.getUserById);

//
router.put("/users/:id", userController.updateUser);

// DELETE
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
