const getNewFilmDetails = (req, res, data) => {
    const { title, director } = req.body
    if (!title || !director) return res.status(400).json({"error": "Missing fields in request body"})
    const isTitleExisting = data.find(film => film.title === title)
    if (isTitleExisting) return res.status(409).json({"error":"A film with the provided title already exists"})
    return { title, director }
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
        return res.status(404).json({"error": "A film with provided ID does not exist"})
    }
    return foundFilm
}

const deleteFilm = (film, data) => {
    filmIndex = data.indexOf(film)
    data.splice(filmIndex, 1)
}

module.exports = { getNewFilmDetails, createFilm, formatFilm, findfilm, deleteFilm }