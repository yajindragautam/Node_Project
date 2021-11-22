const express = require("express");
const router = express.Router();
const loginValidation = require("../validator/login-validation");
const userController = require("../controller/api/user-controller");
const { catchValidationError } = require("../handler/validation-error-handler");
const UserValidator = require("../validator/user-validator");
const verifyToken = require("../middleware/auth");
const checkObjId = require("../middleware/object-id-check");


// Login
router.post(
  "/login",
  loginValidation,
  catchValidationError(userController.login)
);

// get all users, Request Method: Get
router.get("/users", verifyToken, userController.getAllUser);

// create new users, Request Method: POST
router.post(
  "/register",
  UserValidator,
  catchValidationError(userController.createUser)
);

// Profile
router.get("/profile", verifyToken, userController.getProfile);

// get user by id, Request Method: Get
router.get("/users/:id", checkObjId, userController.getUserById);

//
router.put(
  "/users/:id",
  checkObjId,
  verifyToken,
  UserValidator,
  catchValidationError(userController.updateUser)
);

// DELETE
router.delete("/users/:id", checkObjId, verifyToken, userController.deleteUser);




module.exports = router;
