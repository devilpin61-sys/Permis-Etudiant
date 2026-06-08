const mongoose = require("mongoose");

const vagueSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true,
  },
  dateOuverture: {
    type: Date,
    required: true,
  },
  dateCloture: {
    type: Date,
    required: true,
  },
  dateRentree: {
    type: Date,
    required: true,
  },
  statut: {
    type: String,
    enum: ["a-venir", "ouverte", "fermee", "terminee"],
    default: "a-venir",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Vague", vagueSchema);
