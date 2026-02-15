const express = require("express");
const router = express.Router();
const {
  CreationSG,
  RecuperationSGs,
  RecupererSGParId,
  UpDateSG,
  DeleteSG,
} = require("../controllers/societeGestionController");
const { protect } = require("../middleware/authMiddleware");
router.post("/creationSG", protect, CreationSG);
router.get("/getAllSG", RecuperationSGs);
router.get("/getSG/:id", RecupererSGParId);
router.put("/updateSG/:id", protect, UpDateSG);
router.delete("/deleteSG/:id", protect, DeleteSG);

module.exports = router;
