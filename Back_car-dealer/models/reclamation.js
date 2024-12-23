const mongoose = require("mongoose");

const reclamationSchema = new mongoose.Schema(
  {
    name: { type: String },
    lastname: { type: String },
    email: { type: String },
    phone: { type: String },
    CIN: { type: String },
    passport: { type: String },
    nbDays: { type: String },
    pickUpLocation: { type: String },
    pickUpTime: { type: String },
    pickUpDate: { type: String },
    dropOffdate: { type: String },
    dropOfftime: { type: String },
    price: { type: String },
    message: { type: String },
    car: { type: Object },
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
);

module.exports = mongoose.model("reclamation", reclamationSchema);
