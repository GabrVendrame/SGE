const express = require("express");
const { createEvent, findAllEvents } = require("../controllers/eventController");

const router = express.Router();

router.route('/').get(findAllEvents);
router.route('/').post(createEvent);

module.exports = router;
