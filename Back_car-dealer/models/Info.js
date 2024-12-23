const mongoose = require("mongoose");

const InfoSchema = new mongoose.Schema(
  {
    carId: { type: String },
    vidange: { type: String },
    assurance: { type: String },
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
);

module.exports = mongoose.model("info", InfoSchema);
