import path from 'node:path'                                    //esto sirve para usar path.join, así no nos preocupamos por / o \, según windows o linux.
import express from 'express'                                   //express
import mongoose from 'mongoose'                                 //biblioteca mongoose
import { engine } from 'express-handlebars'                     //handlebars como motor de vistas
import 'dotenv/config'                                          //para variables de entorno
import routerPeliculas from './routers/public.router.js'     //importa RUTAS

// ! CONFIGURACION
const PORT = process.env.PORT
const app = express()

// * Configuración Handlebars
app.engine('hbs', engine({
    defaultLayout: 'main',                                      //es la "base"
    extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', path.join('views'))                            //vistas

// ! CONEXIÓN DB
const conectarMongo = async (uri) => {
    try {
        await mongoose.connect(uri)
        console.log('Conexión a MONGO DB establecida correctamente')
    } catch (error) {
        console.log('Error al conectar a MONGO DB', error)
    }
}
// conectarMongo(process.env.URI_MLOCAL)                           //conexion con URI de BdD en .env
conectarMongo(process.env.URI_MREMOTA)


// ! MIDDLEWARE
app.use(express.static('public'))                           // Que quiero servir archivos estaticos en mi aplicación node
app.use(express.urlencoded({extended: true}))               // Decodifica el body cuando llega por formulario
app.use(express.json())                                     // Decodifica el body cuando llega por json

// ! RUTAS
app.use('/', routerPeliculas)                               //'/' funciona como el prefijo de las rutas de páginas principales de eco-root

app.all('*', (req, res) => {                                //! para las páginas sin ruta devuelve un 404 
    const {method, url} = req
    res.status(404).json(                                   // TODO: devolver página 404 personalizada.
        {
            status: 404,
            url,
            method,
            mensaje: 'No se encontré el recurso solicitado'
        }
    )
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo http://localhost:${PORT}`)
})