const express = require("express");

const router = express.Router();

// === user controller ===
const {
  registerUser,
  SignIn,
  updateUser,
  deleteUser,
  getUser,
} = require("../controller/userController.js");
const {
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken.js");

// == route handling ==
router.route("/register").post(registerUser);
router.route("/signin").post(SignIn);
router.route("/update/:userId").put(verifyTokenAndAuthorization, updateUser);
router.route("/remove/:userId").delete(verifyTokenAndAuthorization, deleteUser);
router.route("/:userId").get(getUser, verifyTokenAndAuthorization);

module.exports = router;
