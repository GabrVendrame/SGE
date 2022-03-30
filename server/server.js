const express = require("express");

let cors = require("cors");
const path = require("path");
const routes = require("./userroutes");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

const uri = "mongodb+srv://admin:tanygay@sogeidb.envsm.mongodb.net/bdsogei";
mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("connected to db");
    } else {
      console.log(err);
    }
  }
);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("sucesso");
});

app.listen(3001, () => {
  console.log("porta 3001");
});