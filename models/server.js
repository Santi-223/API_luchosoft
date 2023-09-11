const express = require('express')// Framework de node
const cookieParser = require('cookie-parser');//Para variables en el navegador
const cors  = require('cors');//Implementar seguridad
const bodyParser = require('body-parser')//Recibir datos de formularios html
const { dbConnection } = require('../database/config')

class Server{

    constructor(){
        this.app = express()
        this.port = process.env.PORT //Capturando variable puerto
        this.insumoPath = '/api/insumos' //Ruta pública insumos
        this.clientePath = '/api/clientes' //Ruta pública proveedores
        this.middlewares();
        this.conectarDB()
        this.routes()
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Escuchando por el puerto ${this.port}`)
        })
    }

    middlewares() {
        this.app.use(cookieParser());
        this.app.use(express.static(__dirname + "/public"));
        this.app.use( cors() );
        this.app.use(bodyParser.json())
    }

    routes(){
        this.app.use(this.insumoPath, require('../routes/insumos'))
        this.app.use(this.clientePath, require('../routes/clientes.js'))
    }
    

    async conectarDB(){
        await dbConnection() //Esperar la respuesta del servidor        
    }
}

module.exports =  Server