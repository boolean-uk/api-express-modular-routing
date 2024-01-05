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

module.exports = { getNewFilmDetails, createFilm, formatFilm }