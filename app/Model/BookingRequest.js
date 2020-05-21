const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// List of columns for Employee schema
let BookingRequest = new Schema(
  {
    name: {
      type: String
    },
    fromDate: {
      type: Date
    },
    bookingDate: {
      type: Date
    },
    toDate: {
      type: Date
    },
    phone: {
      type: Number
    },
    adults: {
      type: Number
    },
    fromToDate : {
      
    }
  },
  {
    collection: "BookingRequest"
  }
);

module.exports = mongoose.model("BookingRequest", BookingRequest);
