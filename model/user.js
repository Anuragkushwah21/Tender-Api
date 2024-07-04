const mongoose = require("mongoose");

const Userschema = new mongoose.Schema(
  {
    name: {
      type: String,
      Required: true,
    },
    email: {
      type: String,
      Required: true,
    },
    password: {
      type: String,
      Required: true,
    },

    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("user", Userschema);

module.exports = UserModel;
