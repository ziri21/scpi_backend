const mongoose = require("mongoose");

const ScpiSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  SG_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SocieteGestion",
  },

  tauxDistribution: {
    type: Number,
    min: 0,
    max: 100,
  },
  prixPart: {
    type: Number,
    min: 0,
  },
  categorie: {
    type: String,

    trim: true,
    enum: ["rendement", "fiscale", "plus-value", "diversifiee"],
    default: "rendement",
  },
  capital: {
    type: String,

    trim: true,
    enum: ["variable", "fixe"],
  },
  frequenceDistribution: {
    type: String,
    trim: true,
    enum: ["mensuel", "trimestriel", "semestriel", "annuel"],
    default: "trimestriel",
  },
  paysInvestissement: {
    type: String,

    trim: true,
    maxLength: 60,
  },
});

module.exports = mongoose.model("Scpi", ScpiSchema);
