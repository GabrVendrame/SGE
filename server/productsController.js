const Product = require("./userRegister");

module.exports = {
  async store(req, res) {
    console.log(req.body);
    const {
      cell,
      confirmpassword,
      cpfCnpj,
      email,
      name,
      password,
      selectUser,
    } = req.body;

    let dataCreate = {};

    dataCreate = {
      cell,
      confirmpassword,
      cpfCnpj,
      email,
      name,
      password,
      selectUser,
    };
    console.log(dataCreate);
    const product = await Product.create(dataCreate); //lista todos produtos
    res.json(product);
  },
};

// email: String,
//   name: String,
//   cpfCnpj: String,
//   cell: String,
//   password: String,
//   confirmpassword: String,
//   userType: String,
