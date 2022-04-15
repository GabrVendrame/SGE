const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword, cpfCnpj, cell, userType } =
    req.body;

  const userExists = await User.findOne({ email });
  console.log(userExists);
  if (userExists) {
    res.status(400);
    throw new Error("Usuario ja cadastrado");
  }
  console.log("dsadas");
  const user = await User.create({
    name,
    email,
    password,
    cpfCnpj,
    cell,
    userType,
    tk: generateToken({ name, email, password, cpfCnpj, cell, userType }),
  });
  console.log(user);
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      tk: user.tk,
    });
  } else {
    res.status(402);
    throw newError("Error");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const newTk = generateToken({
    name: user.name,
    emai: user.email,
    password: user.password,
    cpfCnpj: user.cpfCnpj,
    cell: user.cell,
    userType: user.userType,
  });

  if (user && (await user.matchPassword(password)) && newTk.id === user.tk.id) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      tk: jwt.decode(user.tk),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or password");
  }
});

const findUser = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  console.log(_id);
  const user = await User.findOne({ cpfCnpj: _id });
  if (user) {
    res.json({
      user: user,
    });
  } else {
    res.status(400);
    throw new Error("tk nao encontrado");
  }
});

module.exports = { registerUser, authUser, findUser };
