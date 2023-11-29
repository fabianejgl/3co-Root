import { validationResult } from "express-validator"

const peliculaMiddleware = (req, res, next) => {
    const errores = validationResult(req)
    if ( !errores.isEmpty() ) {
        return res.status(400).json({ errores: errores.array() })
    }
    next()
}

export default peliculaMiddleware