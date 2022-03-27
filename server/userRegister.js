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

const product = mongoose.model("Users", dataSchema);
module.exports = product;
