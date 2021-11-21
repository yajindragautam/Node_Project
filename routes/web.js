const express = require("express");
const router = express.Router();
const homeController = require("../controller/system/home-controller");
const authController = require("../controller/system/auth-controller");
const {
  catchFormValidationError,
} = require("../handler/validation-error-handler");
const UserValidator = require("../validator/user-validator");
const LoginValidator = require("../validator/login-validation");
const checkLoggedInMiddleware = require("../middleware/web-middleware");

// Example Routes
router.get("/", homeController.home);

// Register Routes
router
  .get("/register", authController.registerView)
  .post(
    "/register",
    UserValidator,
    catchFormValidationError(authController.register)
  );

// Login Routes
router
  .get("/login", authController.loginView)
  .post(
    "/login",
    LoginValidator,
    catchFormValidationError(authController.login)
  );

// Logout Routes
router.get("/logout", authController.logout);

// Dashbord Routes
router.get("/dashbord",checkLoggedInMiddleware, homeController.dashbord);

module.exports = router;
