const { leerJson, editarJson } = require("../utils/fileUtils");
const Integrante = require("../models/integrante");

const getAllIntegrantes = async (req, res) => {
  //   const integrantes = leerJson();
  //   res.json(integrantes);
  // };
  try {
    const integrantes = await Integrante.find();
    res.json(integrantes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los integrantes" });
  }
};

const getIntegranteByDni = (req, res) => {
  const { dni } = req.params;
  const integrantes = leerJson();
  const integrante = integrantes.find((i) => i.dni === dni);
  if (integrante) {
    res.status(200).json(integrante);
  } else {
    res.status(404).json({ error: "No existe un integrante con ese dni" });
  }
};

// const addIntegrante = (req, res) => {
//   const { nombre, apellido, dni, email } = req.body;
//   if (!nombre || !apellido || !dni || !email) {
//     return res.status(400).json({ error: "Los campos están incompletos" });
//   }
//   const integrantes = leerJson();
//   integrantes.push({ nombre, apellido, dni, email });
//   editarJson(integrantes);
//   res.status(201).json(integrantes);
// };
const addIntegrante = async (req, res) => {
  const { nombre, apellido, dni, email } = req.body;

  if (!nombre || !apellido || !dni || !email) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const nuevoIntegrante = new Integrante({ nombre, apellido, dni, email });
    await nuevoIntegrante.save();
    res.status(201).json(nuevoIntegrante);
  } catch (error) {
    res.status(500).json({ error: "Error al guardar el integrante" });
  }
};

const updateIntegrante = (req, res) => {
  const { email } = req.params;
  const { apellido } = req.body;
  const integrantes = leerJson();
  const integrante = integrantes.find((i) => i.email === email);
  if (integrante) {
    integrante.apellido = apellido;
    editarJson(integrantes);
    res.json({ message: "Apellido actualizado", integrante });
  } else {
    res.status(404).json({ error: "No se encontró el email" });
  }
};

const deleteIntegrante = (req, res) => {
  const { dni } = req.params;
  let integrantes = leerJson();
  const integrante = integrantes.find((i) => i.dni === dni);
  if (integrante) {
    integrantes = integrantes.filter((i) => i.dni !== dni);
    editarJson(integrantes);
    res.json(integrantes);
  } else {
    res.status(404).json({ error: "Integrante no encontrado" });
  }
};

module.exports = {
  getAllIntegrantes,
  getIntegranteByDni,
  addIntegrante,
  updateIntegrante,
  deleteIntegrante,
};
