const express = require("express");
const { createUser, loginUser, logout ,forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile} = require("../controllers/userControllers");
const router = express.Router();
const {isAuthenticatedUser,authorizeRoles}=require('../middlewares/auth');
router.route("/register").post(createUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/logout").get(logout);
router.route("/password/forgot/:token").put(resetPassword);


router.route("/me").get(isAuthenticatedUser,getUserDetails );
router.route("password/update").put(isAuthenticatedUser,updatePassword);
router.route("me/update").put(isAuthenticatedUser,updateProfile);
module.exports = router;