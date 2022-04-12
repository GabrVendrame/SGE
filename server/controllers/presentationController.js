const asyncHandler = require("express-async-handler");
const Presentation = require("../models/presentationModel");
const mongoose = require("mongoose");
const Event = require("../models/eventModel");
const findAllPresentations = asyncHandler(async (req, res) => {
  const presentations = await Presentation.find();

  return res.json(presentations);
});

const createPresentation = asyncHandler(async (req, res) => {

  const presentation = await Presentation.create(req.body);
  return res.json(presentation);
});

const findRegisteredPresentationsInEvent = asyncHandler(async (req, res) => {
  const { _id } = req.params;

  const presentations = await Event.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(_id)
      },
    },
    {
      $lookup: {
        from: 'presentations',
        localField: '_id',
        foreignField: 'eventId',
        as: 'registeredPresentations'
      },
    },
    {
      $unwind: "$registeredPresentations"
    },
    {
      $project: {
        _id: 0,
        registeredPresentations: 1
      }
    },
    {
      $replaceWith: "$registeredPresentations"
    }
  ]);

  return res.json(presentations);
});

module.exports = {
  findAllPresentations,
  createPresentation,
  findRegisteredPresentationsInEvent
};

