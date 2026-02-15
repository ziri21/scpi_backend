const mongoose = require("mongoose");
const societeGestionSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  anneeCreation: {
    type: Number,
    required: true,
    min: 1970,
    max: new Date().getFullYear(),
  },
  encoursGlobalSCPI: {
    type: Number,
    required: true,
    min: 0,
  },
  nombreFonds: {
    type: Number,
    min: 0,
    default: 0,
  },
  effectif: {
    type: Number,
    min: 0,
    default: 0,
  },
  siteWeb: {
    type: String,
    required: true,
  },
  adresse: {
    type: String,
    required: true,
  },
  actMaj: {
    type: String,
  },
});
module.exports = mongoose.model("SocieteGestion", societeGestionSchema);
