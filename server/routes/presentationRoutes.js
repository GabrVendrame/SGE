const express = require("express");
const {
  createPresentation,
  findAllPresentations,
  findRegisteredPresentationsInEvent
 } = require("../controllers/presentationController");

const router = express.Router();

router.route('/').get(findAllPresentations);
router.route('/').post(createPresentation);
router.route('/registeredPresentations/:_id').get(findRegisteredPresentationsInEvent);

module.exports = router;
