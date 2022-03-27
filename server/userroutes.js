const express = require("express");
const ProuctsController = require("./productsController");
const routes = express.Router();

routes.get("/", (req, res) => {
  res.json({ msg: "ola" });
});

routes.post("/LoginAndRegister", ProuctsController.store);

module.exports = routes;
