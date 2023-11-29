import models from '../models/public.model.js'               //trae las funciones del modelado de objetos de la BdD
import handleError from '../utils/handleError.js'               //trae manejo de errores
import { mongoToObj } from '../utils/mongoToObj.js'             //funciones útiles

import { Types } from 'mongoose';
const { ObjectId } = Types;

//************************INICIO - CONTROLADORES PUBLIC*******************************
const home = async (req, res) => {
    
  try {  
        let productos = await models.getProdDestacados()
        let categorias = await models.getAllCategorias()
        productos = mongoToObj(productos)
        categorias = mongoToObj(categorias)
        res.status(200).render('home', { titulo: 'Home 3co-Root', productos, categorias, home: true }) // Siempre a handlebars le tengo que pasar un obj
    } catch (error) {
        handleError(res, 'Error [list]: No se pudo listar los productos', error)
    }
}

//Queda así, no hay que buscar nada en la BdD (por ahí podriamos crear una tabal "staff" con fotos, nombre, redes)
const quienesSomos = async (req, res) => {
    try{
        let categorias = await models.getAllCategorias()
        categorias = mongoToObj(categorias)
        console.log(categorias)
        res.status(200).render('quienes-somos', {titulo: 'Sobre nosotros', quienesSomos:true, categorias})
    } catch (error) {
        handleError(res, 'Error [quienes-somos]: No se pudo cargar el quienes somos', error);
    }
}

const busquedaProd = async (req, res) => {
    try {
        const query = req.query.palabraInput;   // Obtener el parámetro de consulta 'q' (nombre de búsqueda)
        console.log(typeof(query))              //STRING
        console.log(query)              //STRING
        const idCategoria = req.params.id;      // Obtener el parámetro de ruta opcional 'id' (ID de categoría)
        
        let categorias = await models.getAllCategorias()
        let busqueda = true
        categorias = mongoToObj(categorias)

        if (query && idCategoria) {
            // Realizar la búsqueda de productos por nombre y categoría
            let productos = await models.buscarProductosPorNombreYCategoria(query, idCategoria);
            productos = mongoToObj(productos)
            res.status(200).render('busqueda-prod', { titulo: 'Búsqueda de productos', busqueda: true, productos, query, idCategoria, categorias, mensaje:'Hay query y categoría' });
        } else if (idCategoria) {
            // Realizar la búsqueda de productos por categoría
            let productos = await models.buscarProductosPorCategoria(idCategoria);
            productos = mongoToObj(productos)
            res.status(200).render('busqueda-prod', { titulo: 'Búsqueda de productos', busqueda: true, productos, query, idCategoria, categorias, mensaje:'Hay categoría solo' });
        } else { //if query 
            // Realizar la búsqueda de productos por nombre
            let productos = await models.buscarProductosPorNombre(query);
            productos = mongoToObj(productos)
            // console.log(productos)
            res.status(200).render('busqueda-prod', { titulo: 'Búsqueda de productos', busqueda: true, productos, query, categorias, mensaje:'Busca por query' });
        }
        // } else {
        //     // Si no hay parámetros de búsqueda, mostrar todos los productos (o manejar según sea necesario)
        //     let todosLosProductos = await models.getAllProductos();
        //     todosLosProductos = mongoToObj(todosLosProductos)
        //     res.status(200).render('busqueda-prod', { titulo: 'Búsqueda de productos', productos: todosLosProductos, categorias, mensaje:'No hay ni query ni categoria' });
        // }
    } catch (error) {
        handleError(res, 'Error [read]: No se pudo realizar la búsqueda de productos', error);
    }
}


const detalleProd = async (req, res) => {
    const id = req.params.id
    try {
        const productoMostrar = await models.getOneByIdProducto(id)
        let prodRecomendados = await models.getProdRecomendados(id)
        let categorias = await models.getAllCategorias()
        prodRecomendados = mongoToObj(prodRecomendados)
        categorias = mongoToObj(categorias)
        if (!productoMostrar) {
            throw new Error('No se encontró el producto') //!ESTO me termina el flujo de la ejecución acá
        }

        res.status(200).render('detalle-prod', {titulo:'Detalles del producto',producto: mongoToObj(productoMostrar), idDetalleProducto: id, categorias, prodRecomendados})
    } catch (error) {
        handleError(res, 'Error [show]: No se pudo mostrar el producto', error)
    }

}

const procesarCompra = async (req, res) => {

    try {
        let productos = await models.getAllProductos()
        let categorias = await models.getAllCategorias()
        productos = mongoToObj(productos)
        categorias = mongoToObj(categorias)
        res.status(200).render('procesar-compra', { titulo: 'Termine su compra', productos, categorias, procesarCompra: true }) // Siempre a handlebars le tengo que pasar un obj
    } catch (error) {
        handleError(res, 'Error [list]: No se pudo listar los productos', error)
    }
}




//************************FIN - CONTROLADORES PUBLIC*******************************



// TODO: ADMIN
// Controlador que renderiza el formulario de creación
const formCreate = (req, res) => {
    res.status(200).render('productos/create', {titulo: 'Formulario de creación'})
}

// Controlador que renderiza el formulario de edición
const formEdit = (req, res) => {
    res.status(200).render('productos/edit', {titulo: 'Formulario de edición'})
}

// Controllar que renderiza una producto
const show = async (req, res) => {
    const id = req.params.id

    try {
        const productoMostrar = await models.getOneByIdProducto(id)

        if (!productoMostrar) {
            throw new Error('No se encontré ninguna producto') //!ESTO me termina el flujo de la ejecución acá
        }

        res.status(200).render('productos/show', { producto: mongoToObj(productoMostrar)})
    } catch (error) {
        handleError(res, 'Error [show]: No se pudo mostrar el producto', error)
    }

}


// TODO: A MODIF para ADMIN
const read = async (req, res) => {
    const id = req.params.id

    try {
        if ( id ) {
            const producto = await models.getOneByIdProducto(id)
            res.status(200).json({ ok: true, producto })
        } else {
            const productos = await models.getAllProductos()
            res.status(200).json({ ok: true, productos })
        }
    } catch (error) {
        handleError(res, 'Error [read]: No se pudo leer las producto/s', error)
    }
}

const create = async (req, res) => {
    const producto = req.body

    try {
        const productoCreada = await models.createProducto(producto)

        if ( !productoCreada ) {
            throw new Error('No se pudo crear la producto')
        }

        res.status(201).render('productos/show', { producto: mongoToObj(productoCreada)})
        
    } catch (error) {
        handleError(res, 'Error [create]: No se pudo crear la producto', error)
    }

}

const update = (req, res) => {
    res.send('UPDATE')
}
const remove = (req, res) => {
    res.send('DELETE')
}

export default {
    //eco-root
    home,
    quienesSomos,
    busquedaProd,
    detalleProd,
    procesarCompra,

    read,
    create,
    update,
    remove,
    formCreate,
    formEdit,
    show
}