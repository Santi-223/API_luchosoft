const {Router} = require('express')

//Desestructuración. Extraer un atributo de un objeto

const route = Router() 

//Importar métodos del controlador
const {insumoGet, insumoPost, insumoPut, insumoDelete} = require('../controllers/insumos')

route.get('/', insumoGet) //Listar los datos

route.post('/', insumoPost) //Insertar Datos

route.put('/', insumoPut) //Modificar los datos

route.delete('/', insumoDelete) //Eliminar los datos

module.exports = route