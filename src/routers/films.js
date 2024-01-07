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

// Handling GET, POST, PUT , Delete , remove and PATCH  requests to retrieve all films
router.get("/", (req, res) => {
    // If a director is specified in the query parameters, find films by director
    if (req.query.director) {
        const foundFilms = findFilmsByDirector(req, res);
        return res.status(200).json({ films: foundFilms });
    }


    return res.status(200).json({ films: films });
});


router.post("/", (req, res) => {
    let newFilm = req.body;

    if (!newFilm || !newFilm.title || !newFilm.director) {
        return res
            .status(400)
            .json({ error: "Missing fields in the request body" });
    }
    if (filmMatch(newFilm)) {
        return res
            .status(409)
            .json({ error: "A film with the provided title already exists" });
    }

    // Assign a unique ID and add the new film to the array
    newFilm = { id: ++filmCounter, ...newFilm };
    films.push(newFilm);
    return res.status(201).json({ film: newFilm });
});
router.get("/:id", (req, res) => {
    const foundFilm = findFilmByID(req, res);
    return res.status(200).json({ film: foundFilm });
});
router.delete("/:id", (req, res) => {
    const foundFilm = findFilmByID(req, res);
    const foundFilmIndex = films.indexOf(foundFilm);

    // Remove the film from the array
    films.splice(foundFilmIndex, 1);

    // Return the deleted film
    return res.status(200).json({ film: foundFilm });
});
router.put("/:id", (req, res) => {
    const foundFilm = findFilmByID(req, res);
    const updateInfo = req.body;
    if (!updateInfo || !updateInfo.title) {
        return res
            .status(400)
            .json({ error: "Missing fields in the request body" });
    }
    if (filmMatch(updateInfo)) {
        return res
            .status(409)
            .json({ error: "A film with the provided title already exists" });
    }

    // Update the film with the new information
    foundFilm.title = updateInfo.title;
    foundFilm.director = updateInfo.director;
    return res.status(200).json({ film: foundFilm });
});

// Handle PATCH request to partially update a film by ID
router.patch("/:id", (req, res) => {
    const foundFilm = findFilmByID(req, res);
    const { title, director } = req.body;
    if (title === "" || director === "" || !req.body) {
        return res
            .status(400)
            .json({ error: "Missing fields in the request body" });
    }
    if (filmMatch(req.body)) {
        return res
            .status(409)
            .json({ error: "A film with the provided title already exists" });
    }

    foundFilm.title = title ? title : foundFilm.title;
    foundFilm.director = director ? director : foundFilm.director;
    return res.status(200).json({ film: foundFilm });
});

module.exports = router;