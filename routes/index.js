const express = require("express");
const router = express.Router();
const loginValidation = require("../validator/login-validation");
const userController = require("../controller/user-controller");
const userValidator = require("../validator/user-validator");
const catchError = require("../handler/validation-error-handler");
const UserValidator = require("../validator/user-validator");

// CROU IN ARRAY
let users = [];

// Login
router.post("/login", loginValidation, catchError(userController.login));

// get all users, Request Method: Get
router.get("/users", userController.getAllUser);

// create new users, Request Method: POST
router.post("/users", userValidator, catchError(userController.createUser));

// get user by id, Request Method: Get
router.get("/users/:id", userController.getUserById);

//
router.put("/users/:id", UserValidator, catchError(userController.updateUser));

// DELETE
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
