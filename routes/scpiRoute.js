const express = require("express");
const router = express.Router();
const {
  CreationScpi,
  getAllScpi,
  updateScpi,
  deleteScpi,
  getScpiById,
  getSpecificScpi,
} = require("../controllers/scpiController");
const { protect } = require("../middleware/authMiddleware");
router.post("/CreationScpi", protect, CreationScpi);
router.get("/getAllScpi", getAllScpi);
router.get("/getScpiById/:id", getScpiById);
router.get("/getScpiSpec", getSpecificScpi);
router.put("/updateScpi/:id", protect, updateScpi);
router.delete("/deleteScpi/:id", protect, deleteScpi);
module.exports = router;
