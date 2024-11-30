const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const {
  getAllIntegrantes,
  getIntegranteByDni,
  addIntegrante,
  updateIntegrante,
  deleteIntegrante,
} = require("../controllers/integrantesController");

router.get("/", verifyToken, getAllIntegrantes);
router.get("/:dni", verifyToken, getIntegranteByDni);
router.post("/agregar", addIntegrante);
router.put("/:email", verifyToken, updateIntegrante);
router.delete("/:dni", verifyToken, deleteIntegrante);

module.exports = router;
