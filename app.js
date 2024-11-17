const express = require("express"); //primero importamos express
const fs = require("fs"); //segundo la libreria fs, esta es la que nos permite interactuar con los archivos
const app = express(); // en la constante app guardo express para poder usarlo en mi aplicacion
const PORT = 5000; //defino el puerto 5000, ya que la mayoria de los proyectos tienen el puerto por default 3000, para diferenciar este proyecto usamos el puerto 5000
//metodo use para que mi proyecto trabaje con json
app.use(express.json());

// leer integrantes desde el archivo json creado con la lib fs
const leerJson = () => {
  const data = fs.readFileSync("./integrantes.json", "utf-8");
  return JSON.parse(data);
};

// al escribir o modificar el json tambien usamos la libreria fs
const editarJson = (data) => {
  fs.writeFileSync("./integrantes.json", JSON.stringify(data, null, 2));
};

// ruta principal "/" Consigna GET 1
app.get("/", (req, res) => {
  res.send("La API está funcionando correctamente (consigna 1)");
});

// ruta GET /integrantes Consigna GET 2, es un GET ALL que devuelte todos los elementos del json
app.get("/integrantes", (req, res) => {
  const integrantes = leerJson();
  res.json(integrantes);
});

// ruta GET /integrandes/:dni Consigna GET 3, trae 1 elemento del json segun su DNI
app.get("/integrantes/:dni", (req, res) => {
  const { dni } = req.params;
  const integrantes = leerJson();
  const integrante = integrantes.find((i) => i.dni === dni);

  if (integrante) {
    res.status(200).json(integrante); //devuelve el integrante
  } else {
    res.status(404).json({ error: "No existe un integrante con ese dni" }); //mensaje de error
  }
});

// ruta POST /integrantes/agregar Consigna POST para crear una nueva entrada en el json.
app.post("/integrantes/agregar", (req, res) => {
  const { nombre, apellido, dni, email } = req.body; //el body del posteo debe contener un par clave valor de nombre apellido dni email

  if (!nombre || !apellido || !dni || !email) {
    //condicional para que no falte ningun input del usuario
    return res.status(400).json({ error: "Los campos estan incompletos" }); //respuesta del sistema en caso de haber un error, desde el front se puede hacer una resuesta item por item para que el usuario final sepa que le falta
  }

  const integrantes = leerJson(); //esta constante es para leer el json dentro de este metodo y poder editarlo y volver a consultarlo

  integrantes.push({ nombre, apellido, dni, email }); // metodo push para agregar el nuevo integrante

  editarJson(integrantes); // usamos el metodo creado mas arriba en la linea 15 para agregar un integrante nuevo

  res.status(201).json(integrantes); // response con la lista actualizada, aprovechamos para checkear su correcto funcionamiento
});

// ruta PUT /integrantes/:email Consigna PUT para editar una entrada segun su mail.
app.put("/integrantes/:email", (req, res) => {
  const { email } = req.params; //el metodo PUT va a pedir como parametro el email para buscarlo en la lista
  const { apellido } = req.body; //la consigna solo pide editar el apellido
  const integrantes = leerJson(); //trae la lista
  const integrante = integrantes.find((i) => i.email === email); //busca el integrante segun su dni,para luego poder manipularlo

  if (integrante) {
    integrante.apellido = apellido; //actualiza el apellido
    editarJson(integrantes); //guarda los cambios en el archivo
    res.json({ message: "Apellido actualizado", integrante }); // responde con el mensaje y el integrante actualizado
  } else {
    res.status(404).json({ error: "No se encontró el email" }); // responde con un error si no se encontro
  }
});

// ruta DELETE /integrantes/:dni Consigna DELETE busca segun dni y lo borra si lo encuentra. OJO porque la ruta es la misma que el GetOne. En el postman debe estar bien puesto el metodo
app.delete("/integrantes/:dni", (req, res) => {
  const { dni } = req.params; //el metodo pide como parametro el dni
  let integrantes = leerJson(); //me traigo toda la lista para buscar por dni
  const integrante = integrantes.find((i) => i.dni === dni); //busco por dni en la lista

  if (integrante) {
    //filtro por el dni, lo elimino
    integrantes = integrantes.filter((i) => i.dni !== dni);
    editarJson(integrantes);
    res.json(integrantes);
  } else {
    res.status(404).json({ error: "Integrante no encontrado" }); //respuesta si no existe el dni
  }
});

// ruta para correr el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
