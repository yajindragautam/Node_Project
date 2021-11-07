const express = require("express");
const router = express.Router();
const loginValidation = require("../validator/login-validation");
const userController = require("../controller/user-controller");
const userValidator = require("../validator/user-validator");
const catchError = require("../handler/validation-error-handler");
const UserValidator = require("../validator/user-validator");
const verifyToken = require("../middleware/auth");

// CROU IN ARRAY
let users = [];

// Login
router.post("/login", loginValidation, catchError(userController.login));

// get all users, Request Method: Get
router.get("/users",verifyToken, userController.getAllUser);

// create new users, Request Method: POST
router.post("/register", userValidator, catchError(userController.createUser));

// Profile
router.get("/profile", verifyToken, userController.getProfile);

// get user by id, Request Method: Get
router.get("/users/:id",verifyToken ,userController.getUserById);

//
router.put("/users/:id",verifyToken, UserValidator, catchError(userController.updateUser));

// DELETE
router.delete("/users/:id",verifyToken, userController.deleteUser);

module.exports = router;
