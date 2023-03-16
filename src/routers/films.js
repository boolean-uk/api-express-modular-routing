// For the data, import the module from the file
const { films } = require("../../data");

// This enables the use of express router
const router = require("express").Router();

// ROUTES

router.get("/", (req, res) => {
  res.json({ films });
});

router.get("/:id", (req, res) => {
  const film = findFilm(req.params.id);
  res.json({ film });
});

router.post("/", (req, res) => {
  const newId = films[films.length - 1].id + 1;
  const film = { ...req.body, id: newId };
  films.push(film);
  res.status(201).json({ film });
});

router.put("/:id", (req, res) => {
  const film = findFilm(req.params.id);
  const updatedFilm = { id: film.id, ...req.body };
  films[films.indexOf(film)] = updatedFilm;
  res.json({ film: updatedFilm });
});

router.delete("/:id", (req, res) => {
  const film = findFilm(req.params.id);
  films.splice(films.indexOf(film), 1);
  res.json({ film });
});

function findFilm(id) {
  return films.find((film) => film.id == id);
}

module.exports = router;
