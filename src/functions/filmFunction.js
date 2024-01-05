const getNewFilmDetails = (req) => {
    const details = {
        "title": req.body.title,
        "director": req.body.director
    }
    return details
}

const createFilm = (details, currentFilmId, data) => {
    const newFilm = {
        id: ++currentFilmId,
        ...details
    }
    data.push(newFilm)
    return newFilm
}

const formatFilm = (filmToFormat) => {
    const film = {
        "film": filmToFormat
    }
    return film
}

const findfilm = (req, res, data) => {
    const filmId = Number(req.params.id)
    const foundFilm = data.find(film => film.id === filmId)
    if (!foundFilm) {
        return res.status(404).json(`Film with ID: ${filmId} does not exist`)
    }
    return foundFilm
}


const deleteFilm = (film, data) => {
    filmIndex = data.indexOf(film)
    data.splice(filmIndex, 1)
}


module.exports = { getNewFilmDetails, createFilm, formatFilm, findfilm, deleteFilm }