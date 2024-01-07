const express = require("express");
const router = express.Router();
const data = require("../../data/index.js");

const currentFilmId = 5;
const films = data.films;

// Function to find a film by ID
const findFilm = (req, res) => {
  const filmId = Number(req.params.id);
  const foundFilm = films.find((film) => film.id === filmId);

  if (!foundFilm) {
    res.status(404).json({ error: `Film with ID ${filmId} not found` });
  }

  return foundFilm;
};

// Route to get all films
router.get("/", (req, res) => {
  res.status(200).json({ films: films });
});

// Route to add a new film
router.post("/", (req, res) => {
  const { title, director } = req.body;
  const newFilm = { id: currentFilmId, title, director };
  films.push(newFilm);
  res.status(201).json({ film: newFilm });
});

// Route to get a film by ID
router.get("/:id", (req, res) => {
  const film = findFilm(req, res);

  if (film) {
    res.status(200).json({ film: film });
  }
});
// Route to  a deleted film by ID
router.delete("/:id",(req, res) => {
  const film = findFilm(req, res)

if (film) {
  const filmIndex = films.indexOf(film)
  const deletedFilm = films[filmIndex];
  films.splice(filmIndex, 1)

  return res.status(200).json({ film: deletedFilm, message: 'Deleted film Successfully' });
}
})

// Route to edit a film by ID
router.put('/:id', (req, res) => {
  const film = findFilm(req, res)

  if (film) {
    const { title, director } = req.body
    film.title = title
    film.director = director


    return res.json({film: film})
  }
})

module.exports = router;
