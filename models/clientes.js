const {Schema, model} = require('mongoose')

const UsuarioSchema = Schema({

    nombre_cliente: {
        type: String,
        required: [true, 'El nombre del cliente es obligatorio']
    },

    telefono_cliente: {
        type: String,
        required: [true, 'El telefono del cliente es obligatorio'],

    },

    direccion_cliente: {
        type: String,
        required: [true, 'La direccion del cliente es obligatorio']
    },

    cliente_frecuente: {
        type: Boolean,
        default: false
    },

    estado_cliente: {
        type: Boolean,
        default: true
    }
})

//Exportar la función UsuarioSchema
module.exports = model('clientes',UsuarioSchema)