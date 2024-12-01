# Proyecto integrador backend

Proyecto realizado con Node.js, en javascript y usando la libreria Express y Fs.

Para correr el proyecto debe clonar el repositorio o descargarlo como zip.

Abrir la carpeta del proyecto con VSC o algun editor de codigo.

Una vez en el directorio, ejecutar el comando npm install para instalar las dependencias localmente.

## Correr el proyecto

Para correr el codigo usar el comando node app.js esto ejecuta el archivo app.js dentro del directorio.

Tener en cuenta que el proyecto esta configurado en el puerto 5000 para evitar conflicto con algun otro proyecto que pueda estar corriendo localmente.

ruta http://localhost:5000

## Explicacion del codigo

GET / = Mensaje por consola que verifica que la API esta corriendo.

GET /integrantes =Es un GetAll, devuelve todos los integrantes.

GET /integrantes/:dni = Es un GetOne, trae un integrante segun su dni.

POST /integrantes/agregar = Metodo para crear un nuevo integrante.

PUT /integrantes/:email = Metodo para actualizar un campo de un integrante segun su mail.

DELETE /integrantes/:dni = Elimina un integrante del archivo JSON segun su dni.

NOTA: Tener en cuenta que la ruta para el delete y GetOne son iguales, por lo que al hacer la consulta en el Postman, hay que aclarar el metodo HTTP que se utilizara.

### POSTMAN

Estar atento del seleccionar correctamente el metodo GET POST PUT o DELETE y utilizar las rutas detalladas en el item anterior.

### Instrucciones de cada metodo

## GET

Por consigna tenemos 3 gets.

1. http://localhost:5000 Este get es para testear que la aplicacion este corriendo.
2. http://localhost:5000/integrantes Este get trae todos los integrantes (getAll)
3. http://localhost:5000/integrantes/111111111 Este get trae un integrante segun su dni(parametro) (getOne), en este caso estamos trayendo al usuario con el dni 111111111 (si existe)

Cada uno tiene un mensaje por consola para verificar su correcto funcionamiento.

## POST

http://localhost:5000/integrantes/agregar

Para poder agregar un nuevo integrante, desde el Postman, se debe seleccionar BODY para poder ingresar un json.
El integrante nuevo debe tener formato json.

{
"nombre": "Maggie",
"apellido": "Simpson",
"dni": "666666666",
"email": "maggie@simpson.com"
}

El sistema respondera con la lista actualizada, alli podemos verificar que se haya agregado a "Maggie Simpson"
Si hay campos incompletos habra un mensaje de "Los campos estan incompletos". Ajustar en el front los mensajes por cada campo

## PUT

http://localhost:5000/integrantes/maggie@simpson.com

Esta ruta ejemplo editara el apellido de Maggie simpson (el mail de maggie simpson es el parametro)

Para poder editar su apellido, desde el Postman, se debe seleccionar BODY e ingresamos un nuevo apellido en el formato json (solo el apellido)

{
"apellido": "Flanders"
}

El sistema respondera con el elemento modificado.
En caso de error el sistema respondera "No se encontro el email"

## DELETE

http://localhost:5000/integrantes/666666666

El sistema respondera con la lista actualizada (en este caso eliminamos a maggie)
En caso de error el sistema respondera "Integrante no encontrado"

# UPDATE - Entrega final - Consigna

Para el marco de la entrega final de backend, se solicita agregar ciertas modificaciones al proyecto:

- Validar un usuario con JWT
- Autenticar al menos 3 rutas con el token
- Conectar la app con una base de datos de Mongo Atlas, el cual procesara los datos
- plus: Estructurar el proyecto de modo de que el codigo no este concentrado en app.js

## Notas

Para no complicar el proyecto y poder aprovechar el codigo de la entrega parcial, opte por trabajar con la misma tematica y usando el codigo como base para hacer las modificaciones.

## Independencias

se instalaron dos dependencias jsonwebtoken para el manejo de la autenticacion, y mongoose para la administracion de la base de dato. Tambien se instalo DOTENV para el manejo de variable de entorno para la URI

En caso de clonar el repositorio, se sugiere hacer pull origin master y npm install

```bash
npm install
```

## Explicacion de la re estructuracion.

Con la adicion de las dos funcionalidades a la aplicacion, fue necesario reestructurar el proyecto para mantener orden y claridad.

1. Creacion de .env para agregar la URI de la base de datos. Convirtiendola en una variable de entorno y no exponerla en el codigo directo.
2. Archivo db.js para la conexion con la BD, incluido el statement try-catch para verificar la conexion con la BD o hacer un log del error
   "Conexión exitosa a MongoDB Atlas"
   "Error al conectar con MongoDB Atlas:", error
3. El resto del proyecto se dividio en: controllers, middlewares, models y route.
4. A modo de testeo tenemos la carpeta de data (contiene el json viejo) y utils (manejo del json viejo) el cual en esta version quedan deprecados.
5. Controllers: la carpeta contiene los metodos para el manejo del login e integrantes y los exporta para poder utilizarlos en el resto del codigo.
6. Routes: define los metodos y las rutas para cada metodo. En estos archivos tambien se define cuales metodos requieren una verificacion con JWT.
7. Models: define la estructura y atributos de las colecciones, en este caso "integrante".
8. Middlewares: en este caso tenemos el servicio para verificar y validar el token.

# Login

Para este proyecto se hardcodea un usuario "test_user" con password: "hola123" (definido en el authController.js). El sistema devuelve un mensaje por consola por exito o no.
La sesion puede durar 1 hora. Y en caso de exito el sistema devuelve un token para validar la sesion.

Para realizar el login con POSTMAN se debe ingresar en el body, con formato json:

```bash
{
  "username": "test_user",
  "password": "hola123"
}
```

# Validacion

El token proporcionado es requerido en los metodos GET, PUT y DELETE. En un total de 4 rutas + login.

Para estas validaciones, en POSTMAN debemos asegurar de agregar el Auth bearer token (sin comillas).

# Base de datos

La base de datos se conecta al iniciar la aplicacion con node app.js
En caso de exito, el sistema devuelve por consola : "Conexión exitosa a MongoDB Atlas"

En caso de error devuelve un log del problema antecedido por:
"Error al conectar con MongoDB Atlas:", error

Se puede corroborar el funcionamiento de la base de datos por las consultas y por la persistencia de datos al finalizar la aplicacion con ctrl+cj

## Nota final

El resto de la aplicacion (CRUD) funciona igual a la entrega parcial.
