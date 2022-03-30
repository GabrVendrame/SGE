require("dotenv").config();
const mongoose = require("mongoose");
const Users = require("./Users");
const jwt = require("jsonwebtoken");
const JWT_SECRET =
  "dadoaspdakodkasodkapdkpaodkpoaskdpoaskdpoaksd21313131dasdasd";
const { promisify } = require("util");
module.exports = {
  async store(req, res) {
    console.log(req.body);

    const { cell, confirmpassword, cpfCnpj, email, name, password, userType } =
      req.body;

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

    const Res = await Users.create(dataCreate);

    res.json(Res);
  },

  async login(req, res) {
    console.log("reqlogin");
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    const Res = await Users.findOne({
      email: email,
      password: password,
    }).exec();
    if (Res) {
      const { userType } = Res;

      try {
        const token = jwt.sign(
          {
            id: Res._id,
            obj: Res,
          },
          JWT_SECRET,
          { expiresIn: "30d" }
        );

        res.json({
          msg: "Usuario encontrado ",
          user: email,
          pass: password,
          res: Res,
          userType: userType,
          tk: token,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      res.json({ msg: "Registro nao encontrado", user: false });
    }
  },
};
