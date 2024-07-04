const mongoose = require("mongoose");
const Tenderschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    bufferTime: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);
const TenderModel = mongoose.model("tender", Tenderschema);

module.exports = TenderModel;
