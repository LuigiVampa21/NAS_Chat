const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route("/forgot-password").post(authController.forgotPassword);
router.route("/reset-password").post(authController.resetPassword);

module.exports = router;
