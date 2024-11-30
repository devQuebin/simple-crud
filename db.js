const mongoose = require("mongoose");
require("dotenv").config(); // Carga las variables de entorno desde .env

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conexión exitosa a MongoDB Atlas");
  } catch (error) {
    console.error("Error al conectar con MongoDB Atlas:", error);
    process.exit(1); // Detiene la ejecución si no se puede conectar
  }
};

module.exports = connectDB;
