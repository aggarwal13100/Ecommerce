const express = require("express");
const { createUser, loginUser, logout ,forgotPassword, resetPassword} = require("../controllers/userControllers");
const router = express.Router();

router.route("/register").post(createUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/logout").get(logout);
router.route("/password/forgot/:token").put(resetPassword);


module.exports = router;