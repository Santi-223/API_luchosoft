const {Router} = require('express')

//Desestructuración. Extraer un atributo de un objeto

const route = Router() 

//Importar métodos del controlador
const {clienteGet, clientePost, clientePut, clienteDelete} = require('../controllers/clientes')

route.get('/', clienteGet) //Listar los datos

route.post('/', clientePost) //Insertar Datos

route.put('/', clientePut) //Modificar los datos

route.delete('/', clienteDelete) //Eliminar los datos

module.exports = route