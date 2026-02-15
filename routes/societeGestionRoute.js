const express = require("express");
const router = express.Router();
const {
  CreationSG,
  RecuperationSGs,
  RecupererSGParId,
  UpDateSG,
  DeleteSG,
} = require("../controllers/societeGestionController");
router.post("/creationSG", CreationSG);
router.get("/getAllSG", RecuperationSGs);
router.get("/getSG/:id", RecupererSGParId);
router.put("/updateSG/:id", UpDateSG);
router.delete("/deleteSG/:id", DeleteSG);

module.exports = router;
