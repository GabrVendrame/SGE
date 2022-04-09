const asyncHandler = require("express-async-handler");
const Presentation = require("../models/presentationModel");

const findAllPresentations = asyncHandler(async (req, res) => {
    const presentations = await Presentation.find();

    return res.json(presentations);
});

const createPresentation = asyncHandler(async (req, res) => {
    const presentation = await Presentation.create(req.body);

    return res.json(presentation);
});

module.exports = { findAllPresentations, createPresentation };

