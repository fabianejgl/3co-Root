
export const mongoToObj = (mongoObj) => {
    return JSON.parse(JSON.stringify(mongoObj))
}

