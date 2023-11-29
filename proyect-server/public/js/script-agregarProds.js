// Objeto Document
// Métodos
// Propiedad: innerHTML
// Template String
//console.log(carrito);

const carrito = document.getElementById('carrito')

//const contenedorProducto = document.getElementById('lista-producto')

const contenedorProducto = document.getElementsByClassName('contenedor-productos')[0]
console.log(contenedorProducto);

const carritoLista = document.querySelector('#carrito tbody')

cargarEventos()
function cargarEventos() {

    const vaciarCarritoBtn = carrito.querySelector('#vaciar-carrito')
    
    if(contenedorProducto != null){

        contenedorProducto.addEventListener('click', e => comprarProducto(e))

    }

    document.addEventListener('DOMContentLoaded', leerLocalStorage())

    carrito.addEventListener('click', e => eliminarProductoCarrito(e))

    vaciarCarritoBtn.addEventListener('click', e => vaciarCarrito(e))

    const procesarCarritoBtn = document.getElementById('botonProcesarCompra')

    if(procesarCarritoBtn !== null){

        procesarCarritoBtn.addEventListener('click', e => procesarPedido(e))
    }

}

function comprarProducto(e) {
//    e.preventDefault()
    if (e.target.classList.contains('sumar-carrito')) {
        const producto = e.target.parentElement.parentElement
        console.log(producto);
        leerDatosProducto(producto);
    }
}

function leerDatosProducto(producto) {
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h2').textContent,
        precio: producto.querySelector('p').textContent,
        id: producto.querySelector('button').getAttribute('data-id'),
        cantidad: 1
    }

    console.log('Imprimo el id del prod', infoProducto.id);

    let productosLS
    productosLS = obtenerProductosLocalStorage()

    productosLS.forEach(function (productoLS) {
        if (productoLS.id === infoProducto.id) {
            productosLS = productoLS.id
        }
    })

    if (productosLS === infoProducto.id) {
        console.warn('El producto ya esta en el carrito');
    } else {
        insertarCarrito(infoProducto)
    }
}

function obtenerProductosLocalStorage() {
    let productosLS

    if (localStorage.getItem('productos') === null) {
        productosLS = []
    } else {
        productosLS = JSON.parse(localStorage.getItem('productos'))
        console.log(productosLS);
    }

    return productosLS
}

function insertarCarrito(producto) {
    const row = document.createElement('tr')
    row.innerHTML = `
    <td>
        <img id="imagen-carrito" src="${producto.imagen}" alt="${producto.titulo}" width="100">
    </td>
    <td>${producto.titulo}</td>
    <td>${producto.precio}</td>
    <td>
        <img src="/imgs/img-root/x-circle.svg" alt="" type="button" class="borrar-producto bi bi-x-circle m-3 d-block" data-id="${producto.id}">
    </td>
    `
    /* Agrega al a la imagen lo q se necesite para q se pueda ver donde eliminar el producto (una x o algo así) */

    carritoLista.appendChild(row)
    guardarProductosLocalStorage(producto)
}

function guardarProductosLocalStorage(producto) {
    let productos

    productos = obtenerProductosLocalStorage()

    productos.push(producto)

    localStorage.setItem('productos', JSON.stringify(productos))

}


function leerLocalStorage() {
    let productosLS
    productosLS = obtenerProductosLocalStorage()
    productosLS.forEach(function (producto) {
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>
            <img id="imagen-carrito" src="${producto.imagen}" alt="${producto.titulo}" width="100">
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>
            <img src="/imgs/img-root/x-circle.svg" alt="" type="button" class="borrar-producto bi bi-x-circle m-3 d-block" data-id="${producto.id}">
        </td>
    `
        carritoLista.appendChild(row)
    })
}

//ELIMINAR PRODUCTO

function eliminarProductoCarrito(e) {
    //console.log(e.target);
    //e.preventDefault()
    let producto, productoID

    if (e.target.classList.contains('borrar-producto')) {
        producto = e.target.parentElement.parentElement
        productoID = producto.querySelector('.borrar-producto').getAttribute('data-id')
        producto.remove()
        eliminarProductoLocalStorage(productoID)
    }
}

function eliminarProductoLocalStorage(id) {
    let productosLS
    productosLS = obtenerProductosLocalStorage()
    productosLS.forEach(function (productoLS, index) {
        if (productoLS.id === id) {
            productosLS.splice(index, 1)
        }
    })

    localStorage.setItem('productos', JSON.stringify(productosLS))
}


//VACIAR CARRITO


function vaciarCarrito(e) {
    //e.preventDefault()

    while (carritoLista.firstChild) {
        carritoLista.removeChild(carritoLista.firstChild)
    }
    vaciarLocalStorage()
}

function vaciarLocalStorage() {
    window.localStorage.clear()
}

function procesarPedido(e){
    let array = obtenerProductosLocalStorage()

    console.log(array);

    if ( array.length === 0 ){
        console.warn('El carrito está vacío')
        Swal.fire(
            'No hay productos en el carrito',
            'Carrito Vacío',
            'error'
        )
    } else {
        Swal.fire(
            'Muchas gracias por su compra',
            'Se le envió un mail a su casilla para agendar el envío, verifique su casilla de Spam',
            'success'
        )
        vaciarCarrito(e)
    }
}