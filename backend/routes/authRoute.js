const express = require("express");
const router = express.Router();

const { login, signup, logout } = require("../controllers/authController");
const isAuthorized = require("../middlewares/isAuthorized");

router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/logout").post(isAuthorized , logout);

module.exports = router;
