const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  email: String,
  name: String,
  cpfCnpj: String,
  cell: String,
  password: String,
  confirmpassword: String,
  selectUser: String,
});

const registrousuariocriadorpalestra = mongoose.model(
  "UsuarioCriadorPalestra",
  dataSchema
);
module.exports = registrousuariocriadorpalestra;
