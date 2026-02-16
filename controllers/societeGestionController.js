const SocieteGestion = require("../models/societeGestion");
const mongoose = require("mongoose");
exports.CreationSG = async (req, res) => {
  const {
    nom,
    anneeCreation,
    encoursGlobalSCPI,
    nombreFonds,
    effectif,
    siteWeb,
    adresse,
    description,
  } = req.body;
  try {
    const exists = await SocieteGestion.findOne({ nom: nom });
    if (exists) {
      return res.status(409).json({
        message: "une societé de gestion existe deja a ce nom",
      });
    }
    const nouvelleSoc = await SocieteGestion.create({
      nom,
      anneeCreation,
      encoursGlobalSCPI,
      nombreFonds,
      effectif,
      siteWeb,
      adresse,
      description,
    });
    if (!nouvelleSoc) {
      return res
        .status(500)
        .json({ message: "echec de creation de la societe de gestion" });
    }
    return res
      .status(201)
      .json({ message: "societe de gestion crée avec succés", nouvelleSoc });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.RecuperationSGs = async (req, res) => {
  try {
    console.log("readyState before find =", mongoose.connection.readyState);
    const socGs = await SocieteGestion.find();

    return res.status(200).json({
      message: "Les societés de gestion retrouvés",
      socGs,
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
exports.RecupererSGParId = async (req, res) => {
  const id = req.params.id;
  try {
    const SG = await SocieteGestion.findById(id);
    if (!SG) {
      return res
        .status(404)
        .json({ message: "Societé de gestion introuvable" });
    }
    return res.status(200).json({
      message: "la societé de gestion retrouvée : ",
      SG,
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
exports.UpDateSG = async (req, res) => {
  const id = req.params.id;
  const {
    nom,
    anneeCreation,
    encoursGlobalSCPI,
    nombreFonds,
    effectif,
    siteWeb,
    adresse,
    description,
  } = req.body;
  try {
    const SG = await SocieteGestion.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          nom,
          anneeCreation,
          encoursGlobalSCPI,
          nombreFonds,
          effectif,
          siteWeb,
          adresse,
          description,
        },
      },
      { runValidators: true, returnDocument: "after" },
    );
    if (!SG) {
      return res
        .status(404)
        .json({ message: "Societé de gestion introuvable" });
    }
    return res.status(200).json({
      message: "la societé de gestion est mise a jours ",
      SG,
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
exports.DeleteSG = async (req, res) => {
  const id = req.params.id;
  try {
    const SG = await SocieteGestion.findOneAndDelete({ _id: id });
    if (!SG) {
      return res
        .status(404)
        .json({ message: "Societé de gestion introuvable" });
    }
    return res.status(200).json({
      message: "la societé de gestion supprimée: ",
      SG,
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
