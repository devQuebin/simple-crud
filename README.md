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

http://localhost:3000/integrantes/agregar

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

http://localhost:3000/integrantes/maggie@simpson.com

Esta ruta ejemplo editara el apellido de Maggie simpson (el mail de maggie simpson es el parametro)

Para poder editar su apellido, desde el Postman, se debe seleccionar BODY e ingresamos un nuevo apellido en el formato json (solo el apellido)

{
"apellido": "Flanders"
}

El sistema respondera con el elemento modificado.
En caso de error el sistema respondera "No se encontro el email"

## DELETE

http://localhost:3000/integrantes/666666666

El sistema respondera con la lista actualizada (en este caso eliminamos a maggie)
En caso de error el sistema respondera "Integrante no encontrado"
