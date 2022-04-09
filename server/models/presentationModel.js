const mongoose = require("mongoose");

const PresentationSchema = new mongoose.Schema({
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
});

const Presentation = mongoose.model('Presentation', PresentationSchema);
module.exports = Presentation;