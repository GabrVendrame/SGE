const asyncHandler = require("express-async-handler");
const Presentation = require("../models/presentationModel");
// const mongoose = require("mongoose");
// const Event = require("../models/eventModel");
const findAllPresentations = asyncHandler(async (req, res) => {
  const presentations = await Presentation.find();

  return res.json(presentations);
});

const createPresentation = asyncHandler(async (req, res) => {
  const presentation = await Presentation.create(req.body);

  // Event.aggregate([
  //   {
  //     $lookup: {
  //       from: "presentations",
  //       localField: "_id",
  //       foreignField: "eventId",
  //       as: "registeredPresentations",
  //     },
  //   },
  //   {
  //     $unwind: "$registeredPresentations",
  //   },
  // ]).exec()
  // .then((result) => {
  //   console.log(result);
  // })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  return res.json(presentation);
});

module.exports = { findAllPresentations, createPresentation };

