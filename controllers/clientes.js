const { response } = require('express')
const { generarJWT } = require('../helpers/generar_jwt')
const jwt = require('jsonwebtoken');

//Importación de los modelos
const Cliente = require('../models/clientes')

const clienteGet = async (req, res = response) => {
    const { id_cliente } = req.query;

    try {
        let cliente;

        if (id_cliente) {
            cliente = await Cliente.find({ id_cliente: id_cliente });
        } else {
            cliente = await Cliente.find();
        }

        res.json({ cliente });


    } catch (error) {
        console.error('Error al buscar clientes:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
}


const clientePost = async (req, res) => {
    let mensaje = "Inserción exitosa"

    let token = "";

    const { id_cliente } = req.body

    const body = req.body
    try {
        const cliente = new Cliente(body)
        await cliente.save() //Inserta en la colección

        if(id_cliente != ""){
            token = await generarJWT(id_cliente);
            res.cookie('token',token);//creando la cookie

            mensaje += (', el token es: '+token)
        }
    } catch (error) {
        mensaje = "Se presentaron problemas en la inserción"
        console.log(error)
    }
    res.json({
        msg: mensaje
    })

}

const clientePut = async (req, res) => {

    const { id_cliente, nombre_cliente, telefono_cliente, direccion_cliente, cliente_frecuente, estado_cliente } = req.body

    let mensaje = "Modificación exitosa"

    try {
        await Cliente.updateMany({ id_cliente: id_cliente }, {
            $set: {
                nombre_cliente: nombre_cliente,
                telefono_cliente: telefono_cliente,
                direccion_cliente: direccion_cliente,
                cliente_frecuente: cliente_frecuente,
                estado_cliente: estado_cliente
            }
        });

    } catch (error) {
        mensaje = "Se presentaron problemas en la modificación."
    }
    res.json({
        msg: mensaje
    })
}

const clienteDelete = async (req, res) => {
    const { id_cliente } = req.query
    let mensaje = ''

    try {
        const cliente = await Cliente.deleteOne({ id_cliente: id_cliente })
        mensaje = 'La eliminación se efectuó exitosamente'
    }
    catch (error) {
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