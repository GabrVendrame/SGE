const express = require("express");
const {
  createEvent,
  findAllEvents,
  deleteEvents,
  changeEventsData,
} = require("../controllers/eventController");

const router = express.Router();

router.route("/").get(findAllEvents);
router.route("/CreateEvent").post(createEvent);
router.route("/deleteEvents/:_id").delete(deleteEvents);
router.route("/updateEvent").put(changeEventsData);

module.exports = router;
