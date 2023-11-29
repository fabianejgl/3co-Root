import express from 'express'
const routerPublic = express.Router()
import controller from '../controllers/public.controller.js'
import validator from '../validators/public.validators.js'

/* ----------------------------------------- */
/* CRUD COMPLETO DE PELÍCULAS                */
/* ----------------------------------------- */

// ! Renderizar la vista list.hbs
routerPublic.get('/', controller.home)
routerPublic.get('/quienes-somos/', controller.quienesSomos)
//la misma ruta para cuando seleccionan una categoria en particular oooo buscan un nombre y que se puedan combinar
routerPublic.get('/busqueda-producto/:id?', controller.busquedaProd)
routerPublic.get('/detalle-producto/:id', controller.detalleProd)
routerPublic.get('/procesar-compra/', controller.procesarCompra)



// // ! Renderizar el formulario de creación de película
// routerPublic.get('/api/productos/create', controller.formCreate)
// // ! Renderizar el formulario de edición de película
// routerPublic.get('/api/productos/edit/:id', controller.formEdit)
// // ! Renderizar la vista de una película
// routerPublic.get('/api/productos/show/:id', validator.productoShowValidator, controller.show)



// TODO: PARA ADMIN, hacer un private.router.js
// // ! CRUD: R:READ => READ ONE / ALL | Método GET
// // * http://localhost:8080/api/productos => READ ALL
// // * http://localhost:8080/api/productos/:id => READ ONE
// routerPublic.get('/api/productos/:id?', controller.read)

// // ! CRUD: C:CREATE => CREATE | Método POST
// // * http://localhost:8080/api/productos/ => CREATE
// routerPublic.post('/api/productos/', controller.create)

// // ! CRUD: U:UPDATE => UPDATE | Método PUT
// // * http://localhost:8080/api/productos/:id => UPDATE
// routerPublic.put('/api/productos/:id', controller.update)

// // ! CRUD: D:DELETE => DELETE | Método DELETE
// // * http://localhost:8080/api/productos/:id => DELETE
// routerPublic.delete('/api/productos/:id', controller.remove)

export default routerPublic

/* 
!ESTO ES PARA LA APRTE DE ADMIN DE ECO-ROOT SI LLEGAMOS
----------- ASÍ NOOOO ---------------------
GET  | /listar-todos-los-post  | READ ALL
GET  | /listar-un-post/:id     | READ ONE
----------- ASÍ SIIII ---------------------
GET    | /api/productos          | READ ALL
GET    | /api/productos/:id      | READ ONE
POST   | /api/productos          | CREATE
PUT    | /api/productos/:id      | UPDATE
DELETE | /api/productos/:id      | DELETE
-------------------------------------------
*/
