
const handleError = (res, mensaje = 'Algo sucedió', error, codigo = 500) => {
    console.log(mensaje, error)
    return res.status(codigo).json({ok: false, error: mensaje})
}

export default handleError