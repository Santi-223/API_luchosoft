//Importación de los modelos
const Insumo = require('../models/insumos')
const { generarJWT } = require('../helpers/generar_jwt')
const jwt = require('jsonwebtoken');

//Método GET de la API
const insumoGet = async(req, res = response) =>{
    //const {nombre} = req.query //Desestructuración
    const {id_insumo} = req.query;
    //Consultar todos los usuarios
    try {
        let insumo;

        let token;

        if (id_insumo) {
            // Si se proporciona un id, realizar una búsqueda por nombre
            insumo = await Insumo.find({ id_insumo: id_insumo });

            if(insumo != ""){
                token = await generarJWT(insumo.id_insumo);
                res.cookie('token',token);//creando la cookie
            }
        } else {
            // Si no se proporciona un id, consultar todos los clientes
            insumo = await Insumo.find();
        }

        if (token==""){
            res.json({ insumo }); // Enviar tanto el cliente como el token en la misma respuesta JSON
        }else{
            res.json({ insumo, token }); // Enviar tanto el cliente como el token en la misma respuesta JSON
        }
    } catch (error) {
        console.error('Error al buscar clientes:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
}

const insumoPost = async(req, res) => {
    let mensaje = "Inserción exitosa"

    let token = "";

    const { id_insumo } = req.body

    const body = req.body
    try {
        const insumo= new Insumo(body)
        await insumo.save() //Inserta en la colección

        if(id_insumo != ""){
            token = await generarJWT(id_insumo);
            res.cookie('token',token);//creando la cookie

            mensaje += (', el token es: '+token)
        }
    }catch (error) {
        mensaje = "Se presentaron problemas en la inserción"
        console.log(error)
    }
    res.json({
        msg: mensaje
    })
}

const insumoPut = async(req, res) => {

    const {id_insumo, imagen_insumo, nombre_insumo, tipo_stock_insumo, stock_insumo, estado_insumo, categoria_insumo} = req.body

    let mensaje = "Modificación exitosa"

    try {
        await Insumo.updateMany({id_insumo: id_insumo}, {$set: {
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
    const {id_insumo} = req.query
    let mensaje = ''

    try{
        const insumo = await Insumo.deleteOne({id_insumo: id_insumo})
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