const express = require("express");
const {
  registerUser,
  authUser,
  findUser,
} = require("../controllers/userControllers");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/find/:_id").get(findUser);

module.exports = router;
