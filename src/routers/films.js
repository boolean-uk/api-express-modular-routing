// Importing films array from a data module
const { films } = require("../../data/index.js");

// Importing the Express framework and creating a router instance
const express = require("express");
const router = express.Router();

// Initializing a counter for assigning unique IDs to films
let filmCounter = 4;

// Function to check if a film with the provided title already exists
function filmMatch(filmTitle) {
    const foundFilm = films.find((film) => film.title === filmTitle.title);
    if (foundFilm) return true;
    return false;
}

// Helper function to find a film by its ID
function findFilmByID(req, res) {
    const filmID = Number(req.params.id);
    const foundFilm = films.find((film) => film.id === filmID);

    // Handling the case where no film with the provided ID is found
    if (!foundFilm)
        return res
            .status(404)
            .json({ error: `A film with the provided ID does not exist` });

    return foundFilm;
}

// Helper function to find films by director
function findFilmsByDirector(req, res) {
    const filmDirector = req.query.director;

    // Filtering films by director
    const foundFilmsByDirector = films.filter(
        (film) => film.director === filmDirector
    );

    console.log(foundFilmsByDirector);

    // Handling the case where no films with the specified director are found
    if (!foundFilmsByDirector || foundFilmsByDirector.length === 0) {
        return res.status(404).json({
            error: `No films with director: ${filmDirector}`,
        });
    }

    return foundFilmsByDirector;
}
module.exports = router;