const mongoose = require("mongoose");

const integranteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  dni: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
});

module.exports = mongoose.model("Integrante", integranteSchema);
