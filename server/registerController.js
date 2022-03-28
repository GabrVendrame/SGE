const mongoose = require("mongoose");
module.exports = {
  async store(req, res) {
    console.log(req.body);
    const dataSchema = new mongoose.Schema({
      email: String,
      name: String,
      cpfCnpj: String,
      cell: String,
      password: String,
      confirmpassword: String,
      userType: String,
    });

    const { cell, confirmpassword, cpfCnpj, email, name, password, userType } =
      req.body;
    var User = null;
    console.log(userType);
    if (userType === "Usuario Comum") {
      User = mongoose.model("UsuarioComum", dataSchema);
    } else if (userType === "Usuario Palestrante") {
      User = mongoose.model("UsuarioPalestrante", dataSchema);
      console.log("aqui2");
    } else {
      User = mongoose.model("UsuarioCriadorEvento", dataSchema);
    }
    console.log("esse");
    const dataCreate = {
      cell,
      confirmpassword,
      cpfCnpj,
      email,
      name,
      password,
      userType,
    };
    console.log(dataCreate);
    const Res = await User.create(dataCreate);
    res.json(User);
  },
  async login(req, res) {},
};
