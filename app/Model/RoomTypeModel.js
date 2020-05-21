const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// List of columns for Employee schema
let RoomTypeModel = new Schema(
  {
    name: {
      type: String
    },
    type: {
      type: String
    },
    number: { type: String },
    status: { type: String },
    service: {
      houseKeepingRequired: { type: Boolean },
      plumberRequired: { type: Boolean },
      electricianRequired: { type: Boolean }
    }
  },
  {
    collection: "Rooms"
  }
);

module.exports = mongoose.model("RoomTypeModel", RoomTypeModel);
