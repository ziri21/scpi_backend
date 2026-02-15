const Scpi = require("../models/scpi");
const societeGestion = require("../models/societeGestion");
exports.CreationScpi = async (req, res) => {
  const {
    nom,
    SG_id,
    tauxDistribution,
    prixPart,
    categorie,
    capital,
    frequenceDistribution,
    paysInvestissement,
  } = req.body;
  try {
    const exists1 = await societeGestion.findById(SG_id);
    const exists2 = await Scpi.findOne({ nom: nom });
    if (!exists1) {
      return res
        .status(404)
        .json({ message: "societé de gestion introuvable" });
    }
    if (exists2) {
      return res.status(409).json({ message: " Scpi existante a ce nom " });
    }
    const scpi = await Scpi.create({
      nom,
      SG_id,
      tauxDistribution,
      prixPart,
      categorie,
      capital,
      frequenceDistribution,
      paysInvestissement,
    });
    if (!scpi) {
      return res.status(404).json({ message: "Echec de creation de scpi " });
    }
    return res.status(201).json({ message: "Creation de scpi réussi", scpi });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.getAllScpi = async (req, res) => {
  try {
    const scpi = await Scpi.find().populate("SG_id");
    return res.status(200).json({ message: "les scpis retrouvées", scpi });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.updateScpi = async (req, res) => {
  const {
    nom,
    SG_id,
    tauxDistribution,
    prixPart,
    categorie,
    capital,
    frequenceDistribution,
    paysInvestissement,
  } = req.body;
  const id = req.params.id;
  try {
    if (SG_id) {
      const exists1 = await societeGestion.findById(SG_id);

      if (!exists1) {
        return res
          .status(404)
          .json({ message: "Societé de gestion introuvable" });
      }
    }
    const scpiMaj = await Scpi.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          nom,
          SG_id,
          tauxDistribution,
          prixPart,
          categorie,
          capital,
          frequenceDistribution,
          paysInvestissement,
        },
      },
      { runValidators: true, returnDocument: "after" },
    );
    if (!scpiMaj) {
      return res.status(404).json({ message: "Scpi introuvable" });
    }
    return res.status(200).json({ message: "Mise a jours réusie", scpiMaj });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.deleteScpi = async (req, res) => {
  const id = req.params.id;
  try {
    const scpi = await Scpi.findOneAndDelete(id);
    if (!scpi) {
      return res.status(404).json({ message: "Scpi introuvable" });
    }
    return res
      .status(200)
      .json({ message: "Supression de Scpi reussie", scpi });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
exports.getScpiById = async (req, res) => {
  const id = req.params.id;
  try {
    const scpi = await Scpi.findById(id);
    if (!scpi) {
      return res.status(404).json({ message: "Scpi introuvable" });
    }
    return res.status(200).json({ message: "Scpi retrouvée", scpi });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.getSpecificScpi = async (req, res) => {
  const {
    nom,
    SG_id,
    tauxDistribution,
    prixPart,
    categorie,
    capital,
    frequenceDistribution,
    paysInvestissement,
  } = req.query;
  const filter = {};
  if (nom) filter.nom = nom;
  if (SG_id) filter.SG_id = SG_id;
  if (tauxDistribution) filter.tauxDistribution = tauxDistribution;
  if (prixPart) filter.prixPart = prixPart;
  if (categorie) filter.categorie = categorie;
  if (capital) filter.capital = capital;
  if (paysInvestissement) filter.paysInvestissement = paysInvestissement;
  if (frequenceDistribution)
    filter.frequenceDistribution = frequenceDistribution;
  const scpi = await Scpi.find(filter);
  return res.status(200).json(scpi);
};
