const express = require("express");
const router = express.Router();
const homeController = require("../controller/system/home-controller");


// Example Routes
router.get("/", homeController.home);

// Register Routes
router.get("/register", homeController.registerView)
        .post("/register", homeController.register);


module.exports = router;
