// Objeto Document
// Métodos
// Propiedad: innerHTML
// Template String
document.getElementById("idheader").innerHTML = `
    <!-- IZQ: Logo -->
    <div class="logo">
        <a href="index.html"><img src="imgs/img-root/logo.png" alt="Logo de la empresa"></a>
    </div>

    <!-- DER: Buscador --- persona, carrito, menú hamburguesa-->
    <div class="nav-header">
        <div class="buscador">
            <input type="text" placeholder="Buscar productos...">
            <button><img src="imgs/img-root/lupa.svg" alt="Icono de búsqueda"></button>
        </div>
        
        <div class="icons">
            <a href=""><img src="imgs/img-root/usuario.svg" alt="Icono de usuario"></a>

            <div class="dropdown-center">
                <img src="imgs/img-root/carro.svg" alt="Icono de carrito de compras" class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <div id="carrito" class="dropdown-menu">
                    <table class="table table-success table-striped-columns">
                        <thead>
                            <tr>
                                <th scope="col">Imagen</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Precio</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
    
                        </tbody>
                    </table>
                    <div class="d-grid gap-2">
                        <button id="vaciar-carrito" class="btn btn-secondary" type="button">Vaciar Carrito</button>
                        <button id="procesar-carrito" class="btn btn-success" type="button">Procesar Compra</button>
                    </div>
                </div>
            </div>

            <a href=""><img src="imgs/img-root/menu.svg" alt="Icono de menú desplegable"></a>
        </div>
    </div>
`
document.getElementById("idfooter").innerHTML =`
<div class="footer-top">
    <ul>
        <p class="eco-root"><span>3</span>CO <span>R</span>OOT</p>
        <p>CABA, Argentina</p>
        <div class="links-footer">
            <a href="https://www.pescar.org.ar/" target="_blank"><strong>Fundación Pescar</strong></a>
        <div>

        <!-- <div class="redes">

        </div> -->
    </ul>
    <ul>
        <p class="titulo-footer"><strong>Categorías</strong></p>
        <div class="links-footer">
            <a href="">Reciclados</a>
            <a href="">Reutilizables</a>
            <a href="">Biodegradables</a>
            <a href="">Segunda Mano</a>
            <a href="">Restaurados</a>
        </div>
    </ul>
    <ul>
        <p class="titulo-footer"><strong>Info</strong></p>
        <!-- <div class="links-footer">     -->
        <div class="links-footer">
            <a id="nosotros" href="">Sobre nosotros</a>
            <a id="noticias" href="">Noticias sustentables</a>
        </div>
        <!-- </div> -->
    </ul>
</div>
<div class="footer-bottom">
    <p>@Webecy - All Rights Reserved</p>
</div>
`


const carrito = document.getElementById('carrito')
//console.log(carrito);
const contenedorProducto = document.getElementById('contenedor-producto')
//console.log(contenedorProducto);
const carritoLista = document.querySelector('#carrito tbody')

cargarEventos()
function cargarEventos() {
    const vaciarCarritoBtn = carrito.querySelector('#vaciar-carrito')
    const procesarCarritoBtn = carrito.querySelector('#procesar-carrito')

    contenedorProducto.addEventListener('click', e => comprarProducto(e))

    document.addEventListener('DOMContentLoaded', leerLocalStorage())

    carrito.addEventListener('click', e => eliminarProductoCarrito(e))

    vaciarCarritoBtn.addEventListener('click', e => vaciarCarrito(e))


}




function comprarProducto(e) {
    e.preventDefault()
    if (e.target.classList.contains('agregar-carrito')) {
        const producto = e.target.parentElement.parentElement.parentElement
        console.log(producto);
        leerDatosProducto(producto);
    }
}

function leerDatosProducto(producto) {
    const infoProducto = {
        imagen: producto.querySelector('#imagen-producto').src,
        titulo: producto.querySelector('h1').textContent,
        precio: producto.querySelector('h3').textContent,
        id: producto.querySelector('button').getAttribute('data-id'),
        cantidad: 1
    }

    console.log(infoProducto);

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
        <img src="./imgs/img-root/x-circle.svg" alt="" type="button" class="borrar-producto bi bi-x-circle m-3 d-block" data-id="${producto.id}">
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
            <img src="./imgs/img-root/x-circle.svg" alt="" type="button" class="borrar-producto bi bi-x-circle m-3 d-block" data-id="${producto.id}">
        </td>
    `
        carritoLista.appendChild(row)
    })
}

function eliminarProductoCarrito(e) {
    //console.log(e.target);
    e.preventDefault()
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


function vaciarCarrito(e) {
    e.preventDefault() //con botones no es obligatorio

    while (carritoLista.firstChild) {
        carritoLista.removeChild(carritoLista.firstChild)
    }
    vaciarLocalStorage()
}

function vaciarLocalStorage() {
    window.localStorage.clear()
}