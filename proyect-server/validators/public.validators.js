import { check } from "express-validator";
import publicMiddleware from "../middlewares/public.middlewares.js";

const publicShowValidator = [
    // Tengo que tener un array de Middleware
    check('id')
        .isMongoId()
        .withMessage('Envío información incorrecta para mostrar el película'),
    publicMiddleware // <= Define si paso o no paso al controlador
]

export default {
    publicShowValidator
}