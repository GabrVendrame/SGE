const express = require("express");
const {
  createPresentation,
  findAllPresentations,
  findRegisteredPresentationsInEvent,
  deletePresentation,
  changePresentationData,
} = require("../controllers/presentationController");

const router = express.Router();

router.route("/").get(findAllPresentations);
router.route("/CreatePresentations").post(createPresentation);
router
  .route("/registeredPresentations/:_id")
  .get(findRegisteredPresentationsInEvent);

router.route("/deletePresentations/:_id").delete(deletePresentation);
router.route("/updatePalestra").put(changePresentationData);

module.exports = router;
