const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Event = require("../models/eventModel");
const mongoose = require("mongoose");
const generateToken = require("../utils/generateToken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword, cpfCnpj, cell, userType } =
    req.body;

  const userExists = await User.findOne({ email });
  const cpfExists = await User.findOne({ cpfCnpj });
  console.log(userExists);
  if (userExists || cpfExists) {
    res.status(400);
    throw new Error("Usuario ja cadastrado");
  }

  const user = await User.create({
    name,
    email,
    password,
    cpfCnpj,
    cell,
    userType,
    tk: generateToken({ name, email, password, cpfCnpj, cell, userType }),
    userRegisteredEvents: [],
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

const userBuyTicket = asyncHandler(async (req, res) => {
  const {
    presentationId,
    eventId,
    userEmail,
    numEventTickets,
    numPresTickets } = req.body;

  const registeredEvent = await User.findOne({
    email: userEmail,
    "userRegisteredEvents.eventId": eventId,
  }).catch((err) => {
    console.log(err);
  });

  if (registeredEvent) {
    console.log('Registro de evento já criado. Atualizando com novos dados');
    if (presentationId) {
      console.log('Atualizando com id de apresentação')
      const registeredPresentation = await User.findOne(
        {
          email: userEmail,
          'userRegisteredEvents.eventId': eventId,
          'userRegisteredEvents.userRegisteredPresentationsId.presentationId': presentationId
        },
      ).catch(err => {
        console.log(err);
      });
      if (registeredPresentation) {
        console.log('Registro de apresentação já criada, atualizando com novos dados');
        const updateNumPresTickets = await User.updateOne(
          {
            email: userEmail,
            'userRegisteredEvents.eventId': eventId,
            'userRegisteredEvents.userRegisteredPresentationsId.presentationId': presentationId
          },
          {
            $set: {
              "userRegisteredEvents.$[i].numEventTickets": numEventTickets,
              "userRegisteredEvents.$[i].userRegisteredPresentationsId.$[j].numPresTickets": numPresTickets
            }
          },
          {
            arrayFilters: [{
              "i.eventId": eventId,
            },
            {
              "j.presentationId": presentationId
            }]
          }
        ).catch(err => {
          console.log(err);
        });
        return res.json(updateNumPresTickets);
      } else {
        console.log('Registro de apresentação não encontrada, criando novo registro');
        const newPresentationRegister = await User.updateOne(
          {
            email: userEmail,
            'userRegisteredEvents.eventId': eventId,
          },
          {
            $addToSet: {
              "userRegisteredEvents.$.userRegisteredPresentationsId": {
                presentationId: presentationId,
                numPresTickets: numPresTickets,
              }
            }
          }).catch(err => {
            console.log(err);
          });
        return res.json(newPresentationRegister);

      }
    } else {
      console.log('Atualizando sem id da apresentação')
      const updateNumEventTickets = await User.updateOne(
        { email: userEmail, 'userRegisteredEvents.eventId': eventId },
        {
          $set: {
            "userRegisteredEvents.$.numEventTickets": numEventTickets
          }
        },
      ).catch(err => {
        console.log(err);
      });
      return res.json(updateNumEventTickets);

    }
  } else {
    console.log('Registro para esse evento inexistente. Criando novo registro');
    if (presentationId) {
      console.log('Criando registro de evento com apresentação');
      const newRegisteredEventField = await User.updateOne(
        {
          email: userEmail,
        },
        {
          $push: {
            "userRegisteredEvents": {
              eventId: eventId,
              numEventTickets: numEventTickets,
              userRegisteredPresentationsId: {
                presentationId: presentationId,
                numPresTickets: numPresTickets,
              },
            }
          }
        }).catch(err => {
          console.log(err);
        });
      return res.json(newRegisteredEventField);
    } else {
      console.log('Criando registro de evento sem apresentação');
      const newRegisteredEventField = await User.updateOne(
        {
          email: userEmail,
        },
        {
          $push: {
            "userRegisteredEvents": {
              eventId: eventId,
              numEventTickets: numEventTickets,
              userRegisteredPresentationsId: [],
            }
          }
        }).catch(err => {
          console.log(err);
        });
      return res.json(newRegisteredEventField);
    }
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

const changeUserData = asyncHandler(async (req, res) => {
  var { name, password, cell, email, cpfCnpj } = req.body;
  console.log(cpfCnpj);
  const userFind = await User.findOne({ cpfCnpj: cpfCnpj });

  if (name === "") {
    name = userFind.name;
  }
  if (password === "") {
    password = userFind.password;
  }
  if (cell === "") {
    cell = userFind.cell;
  }
  if (email === "") {
    email = userFind.email;
  }
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  let dataCreate = {
    name,
    password,
    cell,
    email,
  };
  const changedUser = await User.findOneAndUpdate({ cpfCnpj }, dataCreate);
  res.json(changedUser);
});

module.exports = {
  registerUser,
  authUser,
  findUser,
  changeUserData,
  userBuyTicket,
};
