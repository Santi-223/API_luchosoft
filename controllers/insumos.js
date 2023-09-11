const {response} = require('express')


//Importación de los modelos
const Insumo = require('../models/insumos')

//Método GET de la API
const insumoGet = async(req, res = response) =>{
    //const {nombre} = req.query //Desestructuración

    //Consultar todos los usuarios
    const insumo = await Insumo.find()

    res.json({  //Respuesta en JSON
        insumo
    })   
}

const insumoPost = async(req, res) => {
    let mensaje = "Inserción exitosa"
    const body = req.body
    try {
        const insumo= new Insumo(body)
        await insumo.save() //Inserta en la colección
    }catch (error) {
        mensaje = error
        console.log(error)
    }
    res.json({
        msg: mensaje
    })
}

const insumoPut = async(req, res) => {

    const {_id, imagen_insumo, nombre_insumo, tipo_stock_insumo, stock_insumo, estado_insumo, categoria_insumo} = req.body

    let mensaje = "Modificación exitosa"

    try {
        await Insumo.updateMany({_id: _id}, {$set: {
            imagen_insumo: imagen_insumo,
            nombre_insumo: nombre_insumo,
            tipo_stock_insumo: tipo_stock_insumo,
            stock_insumo: stock_insumo,
            estado_insumo: estado_insumo,
            categoria_insumo: categoria_insumo
        }});

    }catch (error) {
        mensaje = "Se presentaron problemas en la modificación."
    }
    res.json({
        msg: mensaje
    })
}

const insumoDelete = async (req, res) => {
    const {_id} = req.body
    let mensaje = ''

    try{
        const insumo = await Insumo.deleteOne({_id: _id})
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
    insumoGet,
    insumoPost,
    insumoPut,
    insumoDelete
}