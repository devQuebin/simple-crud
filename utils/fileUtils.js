const fs = require("fs");

const leerJson = () => {
  const data = fs.readFileSync("./data/integrantes.json", "utf-8");
  return JSON.parse(data);
};

const editarJson = (data) => {
  fs.writeFileSync("./data/integrantes.json", JSON.stringify(data, null, 2));
};

module.exports = { leerJson, editarJson };
