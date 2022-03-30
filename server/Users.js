const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  email: String,
  name: String,
  cpfCnpj: String,
  cell: String,
  password: String,
  confirmpassword: String,
  userType: String,
});

const registrousuariocomum = mongoose.model("Users", dataSchema);
module.exports = registrousuariocomum;