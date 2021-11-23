const express = require("express");
const router = express.Router();
const homeController = require("../controller/system/home-controller");
const authController = require("../controller/system/auth-controller");
const bookController = require("../controller/system/book-controller");
const {
  catchFormValidationError,
} = require("../handler/validation-error-handler");
const UserValidator = require("../validator/user-validator");
const BookValidation = require("../validator/book-validator");
const LoginValidator = require("../validator/login-validation");
const ObjectIdCheck = require("../middleware/object-id-check");
const checkLoggedInMiddleware = require("../middleware/web-middleware");
const { uploadImageHandler } = require("../handler/image-upload-handler");

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
router.get("/dashbord", checkLoggedInMiddleware, homeController.dashbord);

// BOOK CONTROLLER STARTS FROM HERE
// Get Book
router.route("/books").get(checkLoggedInMiddleware, bookController.index).post(
  checkLoggedInMiddleware,
  uploadImageHandler.single("image"),
  BookValidation,
  catchFormValidationError(bookController.store)
);
// Books By ID
router
  .route("/books/id")
  .put(
    ObjectIdCheck,
    BookValidation,
    checkLoggedInMiddleware,
    catchFormValidationError(bookController.update)
  )
  .delete(ObjectIdCheck, checkLoggedInMiddleware, bookController.destroy);

// Create Books Views
router
  .route("/books/create")
  .get(checkLoggedInMiddleware, bookController.createView);

module.exports = router;
