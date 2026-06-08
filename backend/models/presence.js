const mongoose = require("mongoose");

const presenceSchema = new mongoose.Schema({
  apprenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cours: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cours",
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  statut: {
    type: String,
    enum: ["present", "absent"],
    required: true,
  },
  autoEcole: {
    type: String,
    enum: ["eloi-service-plus", "lumiere-conduite", "la-capitale", "le-succes"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Presence", presenceSchema);
