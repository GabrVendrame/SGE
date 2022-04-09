const express = require("express");
const { createPresentation, findAllPresentations } = require("../controllers/presentationController");

const router = express.Router();

router.route('/').get(findAllPresentations);
router.route('/').post(createPresentation);

module.exports = router;
