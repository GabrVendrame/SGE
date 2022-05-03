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

const deletePresentation = asyncHandler(async (req, res) => {
  const { _id } = req.params;

  const aux = await Presentation.findByIdAndDelete(_id);
  return res.json(aux);
});

const findRegisteredPresentationsInEvent = asyncHandler(async (req, res) => {
  const { _id } = req.params;

  const presentations = await Event.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(_id),
      },
    },
    {
      $lookup: {
        from: "presentations",
        localField: "_id",
        foreignField: "eventId",
        as: "registeredPresentations",
      },
    },
    {
      $unwind: "$registeredPresentations",
    },
    {
      $project: {
        _id: 0,
        registeredPresentations: 1,
      },
    },
    {
      $replaceWith: "$registeredPresentations",
    },
  ]);

  return res.json(presentations);
});

const changePresentationData = asyncHandler(async (req, res) => {
  // const { user } = req.body;
  var { title, description, remainingVacancies, value, _id } = req.body;

  const presentationfind = await Presentation.findById(_id);
  console.log(presentationfind);
  if (title === "") {
    title = presentationfind.title;
  }
  if (description === "") {
    description = presentationfind.description;
  }
  if (remainingVacancies === null) {
    remainingVacancies = presentationfind.remainingVacancies;
  }
  if (value === null) {
    value = presentationfind.value;
  }

  let dataCreate = {
    title,
    description,
    remainingVacancies,
    value,
  };
  console.log(dataCreate);
  const changedUser = await Presentation.findOneAndUpdate({ _id }, dataCreate);
  res.json(changedUser);
});

module.exports = {
  findAllPresentations,
  createPresentation,
  findRegisteredPresentationsInEvent,
  deletePresentation,
  changePresentationData,
};
