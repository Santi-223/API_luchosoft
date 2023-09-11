const {Router} = require('express')

//Desestructuración. Extraer un atributo de un objeto

const route = Router() 

//Importar métodos del controlador
const {proveedorGet, proveedorPost, proveedorPut, proveedorDelete} = require('../controllers/proveedores')

route.get('/', proveedorGet) //Listar los datos

route.post('/', proveedorPost) //Insertar Datos

route.put('/', proveedorPut) //Modificar los datos

route.delete('/', proveedorDelete) //Eliminar los datos

module.exports = route