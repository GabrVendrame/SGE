const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  img: String,
  value: Number,
  remainingVacancies: Number,
  isSingleDay: Boolean,
  dateByDay: [{
    initialDate: Date,
    finalDate: Date,
  }],
  // registeredPresentations: [ Object ],
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;