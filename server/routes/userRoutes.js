const express = require("express");
const {
  registerUser,
  authUser,
  findUser,
  changeUserData,
  userBuyTicket
} = require("../controllers/userControllers");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/find/:_id").get(findUser);
router.route("/update").put(changeUserData);
router.route("/buyTicket/:presentationId").put(userBuyTicket);

module.exports = router;
