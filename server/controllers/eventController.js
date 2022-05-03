const asyncHandler = require("express-async-handler");
const Event = require("../models/eventModel");

const deleteEvents = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const aux = await Event.findByIdAndDelete(_id);
  return res.json(aux);
});

const findAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find();

  return res.json(events);
});

const createEvent = asyncHandler(async (req, res) => {
  const event = await Event.create(req.body);

  return res.json(event);
});

const changeEventsData = asyncHandler(async (req, res) => {
  // const { user } = req.body;
  console.log("aqui");
  var { title, description, remainingVacancies, value, url, _id, dateByDay } =
    req.body;

  console.log(_id);
  const eventFind = await Event.findById(_id);
  if (title === "") {
    title = eventFind.title;
  }
  if (description === "") {
    description = eventFind.description;
  }
  if (remainingVacancies === null) {
    remainingVacancies = eventFind.remainingVacancies;
  }
  if (value === null) {
    value = eventFind.value;
  }

  if (url === null) {
    url = eventFind.url;
  }

  let dataCreate = {
    title,
    description,
    remainingVacancies,
    value,
    url,
  };

  const aux = await Event.findOneAndUpdate({ _id }, dataCreate);

  res.json(aux);
});

module.exports = {
  findAllEvents,
  createEvent,
  deleteEvents,
  changeEventsData,
};
