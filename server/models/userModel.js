const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  cpfCnpj: String,
  cell: String,
  userType: String,
  tk: String,
  userRegisteredEvents: [
    {
      eventId: String,
      numEventTickets: Number,
      userRegisteredPresentationsId: [
        {
          presentationId: String,
          numPresTickets: Number,
        }
      ],
    }
  ],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
