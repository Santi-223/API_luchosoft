const {response} = require('express')


//Importación de los modelos
const Proveedor = require('../models/proveedores')

//Método GET de la API
const proveedorGet = async(req, res = response) =>{
    //const {nombre} = req.query //Desestructuración

    //Consultar todos los usuarios
    const proveedor = await Proveedor.find()

    res.json({  //Respuesta en JSON
        proveedor
    })   
}

const proveedorPost = async(req, res) => {
    let mensaje = "Inserción exitosa"
    const body = req.body
    try {
        const proveedor= new Proveedor(body)
        await proveedor.save() //Inserta en la colección
    }catch (error) {
        mensaje = error
        console.log(error)
    }
    res.json({
        msg: mensaje
    })
}

const proveedorPut = async(req, res) => {

    const {_id, nombre_proveedor, telefono_proveedor, direccion_proveedor, estado_proveedor} = req.body

    let mensaje = "Modificación exitosa"

    try {
        await Proveedor.updateMany({_id: _id}, {$set: {
            nombre_proveedor: nombre_proveedor,
            telefono_proveedor: telefono_proveedor,
            direccion_proveedor: direccion_proveedor,
            estado_proveedor: estado_proveedor
        }});

    }catch (error) {
        mensaje = "Se presentaron problemas en la modificación."
    }
    res.json({
        msg: mensaje
    })
}

const proveedorDelete = async (req, res) => {
    const {_id} = req.body
    let mensaje = ''

    try{
        const proveedor = await Proveedor.deleteOne({_id: _id})
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
    proveedorGet,
    proveedorPost,
    proveedorPut,
    proveedorDelete
}