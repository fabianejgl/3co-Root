import mongoose from "mongoose"
import { Types } from 'mongoose';
const { ObjectId } = Types;

/* -------------------------------------------------- */
/* Schema (La estructura que va a tener el documento) */
/* -------------------------------------------------- */
const categoriaSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        foto: {
            type: String,
            require:true
        }
    },
    {
        versionKey: false,
        timestamps: true /* createAt y updateAt */
    }
)
/* Model (Basado en el Schema creo el modelo)         */
const CategoriaModel = mongoose.model('categorias', categoriaSchema)

const productoSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        precio: {
            type: Number,
            required: true
        },
        categoria: {
            type: mongoose.Schema.Types.ObjectId,
            ref: CategoriaModel
        },
        destacado: {
            type: Boolean,
            default: false
        },
        fotos: [String],
        // ! ojo al tejo
        descripcion: {
            type:String,
            default:'',
        }
    },
    {
        versionKey: false,
        timestamps: true /* createAt y updateAt */
    }
)
/* Model (Basado en el Schema creo el modelo)         */
const ProductoModel = mongoose.model('productos', productoSchema)



/* -------------------------------------------------- */
/* Métodos de iteracción con la base datos            */
/* -------------------------------------------------- */
const getAllProductos = async () => {

    try {
        // const productos = await ProductoModel.find({})
        const productos = await ProductoModel.find().populate('categoria')
        return productos
    } catch (error) {
        console.log('[getAllProductos]: Error al obtener los productos', error)
    }

}
const getAllCategorias = async () => {

    try {
        // const productos = await ProductoModel.find({})
        const categorias = await CategoriaModel.find()
        return categorias
    } catch (error) {
        console.log('[getAllCategorias]: Error al obtener las categorias', error)
    }

}

// Método para obtener productos destacados
const getProdDestacados = async () => {
    try {
        // Buscar productos con destacado igual a true
        const productosDestacados = await ProductoModel.find({ destacado: true }).populate('categoria');;
        return productosDestacados;
    } catch (error) {
        throw error;
    }
};

const getOneByIdProducto = async (id) => {

    try {
        const producto = await ProductoModel.findById(id).populate('categoria') // null si no encuentra la película
        return producto
    } catch (error) {
        console.log('[getOneByIdProducto]: Error al buscar el producto por ID', error)
        throw error
    }

}

const buscarProductosPorCategoria = async (idCategoria) => {
    try {
        const productos = await ProductoModel.find({ categoria: idCategoria }).populate('categoria');
        return productos;
    } catch (error) {
        console.log('[buscarProductosPorCategoria]: Error al buscar productos por categoría', error);
        throw error;
    }
};

const getProdRecomendados = async (id) => {
    try {
        // Obtén el producto actual para conocer su categoría
        const productoActual = await ProductoModel.findById(id).populate('categoria');

        if (!productoActual) {
            throw new Error('No se encontró el producto actual');
        }

        // Busca productos recomendados de la misma categoría (excluyendo el producto actual)
        const productosRecomendados = await ProductoModel.find({
            categoria: productoActual.categoria,
            _id: { $ne: id } // Excluir el producto actual
        }).limit(3);

        return productosRecomendados;
    } catch (error) {
        console.log('[getProdRecomendados]: Error al obtener productos recomendados', error);
        throw error; // Puedes manejar el error según tus necesidades
    }
};

const buscarProductosPorNombre = async (query) => {
    try {
        console.log(query)
        const productos = await ProductoModel.find({ nombre: { $regex: new RegExp(query, 'i') } }).populate('categoria');
        return productos;
    } catch (error) {
        console.log('[buscarProductosPorNombre]: Error al buscar productos por nombre', error);
        throw error;
    }
};

const buscarProductosPorNombreYCategoria = async (query, idCategoria) => {
    try {
        const productos = await ProductoModel.find({
            nombre: { $regex: new RegExp(query, 'i') },
            categoria: idCategoria
        }).populate('categoria');
        return productos;
    } catch (error) {
        console.log('[buscarProductosPorNombreYCategoria]: Error al buscar productos por nombre y categoría', error);
        throw error;
    }
};



// TODO: Esto se hace si llegamos con ADMIN
const createProducto = async (nuevoProducto) => {

    try {
        
        const producto = new ProductoModel(nuevoProducto)
        const productoGuardado = await producto.save() // Si la película no se crea devuelve null

        return productoGuardado

    } catch (error) {
        console.log('[createProducto]: Error al guardar el producto', error)
    }

}


export default {
    getAllProductos,
    getOneByIdProducto,
    getAllCategorias,
    getProdDestacados,
    getProdRecomendados,
    
    buscarProductosPorCategoria,
    buscarProductosPorNombre,
    buscarProductosPorNombreYCategoria,

    createProducto
}




