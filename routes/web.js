const express = require("express");
const router = express.Router();
const homeController = require("../controller/system/home-controller");
const {
  catchFormValidationError,
} = require("../handler/validation-error-handler");
const UserValidator = require("../validator/user-validator");
const LoginValidator = require("../validator/login-validation");

// Example Routes
router.get("/", homeController.home);

// Register Routes
router
  .get("/register", homeController.registerView)
  .post(
    "/register",
    UserValidator,
    catchFormValidationError(homeController.register)
  );

// Login Routes
router.get("/login", homeController.loginView)
.post('/login', LoginValidator, catchFormValidationError(homeController.login));

module.exports = router;
