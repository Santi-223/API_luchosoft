const {response} = require('express')


//Importación de los modelos
const Cliente = require('../models/clientes')

//Método GET de la API
const clienteGet = async(req, res = response) =>{
    //const {nombre} = req.query //Desestructuración
    const {id_cliente} = req.body;
    //Consultar todos los usuarios
    try {
        let cliente;

        if (id_cliente) {
            // Si se proporciona un id, realizar una búsqueda por nombre
            cliente = await Cliente.find({ id_cliente: id_cliente });
        } else {
            // Si no se proporciona un id, consultar todos los clientes
            cliente = await Cliente.find();
        }

        res.json({ cliente });
    } catch (error) {
        console.error('Error al buscar clientes:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
}

const clientePost = async(req, res) => {
    let mensaje = "Inserción exitosa"
    const body = req.body
    try {
        const cliente= new Cliente(body)
        await cliente.save() //Inserta en la colección
    }catch (error) {
        mensaje = "Se presentaron problemas en la inserción"
        console.log(error)
    }
    res.json({
        msg: mensaje
    })
}

const clientePut = async(req, res) => {

    const {id_cliente, nombre_cliente, telefono_cliente, direccion_cliente, cliente_frecuente, estado_cliente} = req.body

    let mensaje = "Modificación exitosa"

    try {
        await Cliente.updateMany({id_cliente: id_cliente}, {$set: {
            nombre_cliente: nombre_cliente,
            telefono_cliente: telefono_cliente,
            direccion_cliente: direccion_cliente,
            cliente_frecuente: cliente_frecuente,
            estado_cliente: estado_cliente
        }});

    }catch (error) {
        mensaje = "Se presentaron problemas en la modificación."
    }
    res.json({
        msg: mensaje
    })
}

const clienteDelete = async (req, res) => {
    const {id_cliente} = req.body
    let mensaje = ''

    try{
        const cliente = await Cliente.deleteOne({id_cliente: id_cliente})
        mensaje = 'La eliminación se efectuó exitosamente'
    }
    catch(error){
        mensaje = 'Se presentaron problemas en la eliminación'
    }

    res.json({
        msg: mensaje
    })
}

module.exports = {
    clienteGet,
    clientePost,
    clientePut,
    clienteDelete
}