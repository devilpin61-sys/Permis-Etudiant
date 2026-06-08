const mongoose = require("mongoose");

const coursSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ["theorique", "pratique"],
    required: true,
  },
  contenu: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  autoEcole: {
    type: String,
    enum: ["eloi-service-plus", "lumiere-conduite", "la-capitale", "le-succes"],
    required: true,
  },
  centre: {
    type: String,
    enum: ["calavi", "porto-novo", "bohicon", "lokossa", "parakou"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Cours", coursSchema);
