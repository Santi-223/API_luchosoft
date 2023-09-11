const {Schema, model} = require('mongoose')

const UsuarioSchema = Schema({

    nombre_proveedor: {
        type: String,
        required: [true, 'El nombre del proveedor es obligatorio']
    },

    telefono_proveedor: {
        type: String,
        required: [true, 'El telefono del proveedor es obligatorio'],

    },

    direccion_proveedor: {
        type: String,
        required: [true, 'La direccion del proveedor es obligatorio']
    },

    estado_proveedor: {
        type: Boolean,
        default: true,
    }
})

//Exportar la función UsuarioSchema
module.exports = model('proveedores',UsuarioSchema)