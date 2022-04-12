const express = require("express");
const { createEvent,
  findAllEvents,
  // findRegisteredPresentationsInEvent
} = require("../controllers/eventController");

const router = express.Router();

router.route('/').get(findAllEvents);
router.route('/').post(createEvent);
// router.route('/registeredPresentations').get(findRegisteredPresentationsInEvent);

module.exports = router;
