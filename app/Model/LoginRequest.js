const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// List of columns for Employee schema
let LoginRequest = new Schema(
  {
    username: {
      type: String
    },
    password: {
      type: String
    },
    role: { type: Array }
  },
  {
    collection: "Users"
  }
);

module.exports = mongoose.model("LoginRequest", LoginRequest);
