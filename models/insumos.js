const {Schema, model} = require('mongoose')

const UsuarioSchema = Schema({

    imagen_insumo: {
        type: String
    },

    nombre_insumo: {
        type: String,
        required: [true, 'El nombre del insumo es obligatorio']
    },

    tipo_stock_insumo: {
        type: String,
        required: [true, 'El tipo de stock es obligario']
    },

    stock_insumo: {
        type: Number,
        required: [true, 'El stock es obligatorio']
    },

    estado_insumo: {
        type: Boolean,
        default: true,
    },

    categoria_insumo: {
        type: String,
        required: [true, 'La categoria del insumo es obligatoria']
    }
})

//Exportar la función UsuarioSchema
module.exports = model('insumos',UsuarioSchema)