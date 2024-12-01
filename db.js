const mongoose = require("mongoose");
require("dotenv").config(); // carga las variables de entorno desde .env para no exponer la uri

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conexión exitosa a MongoDB Atlas");
  } catch (error) {
    console.error("Error al conectar con MongoDB Atlas:", error);
    process.exit(1); //detiene la ejecucion si no se puede conectar
  }
};

module.exports = connectDB;
