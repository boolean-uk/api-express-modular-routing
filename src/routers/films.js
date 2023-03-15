const router = require("express").Router();
const { films } = require("../../data/index");

router.get("/", (req, res) => {
  if (req.query.director) {
    const filterdFilms = films.filter(
      (film) => film.director === req.query.director
    );
    res.send({ films: filterdFilms });
  }
  res.send({ films });
});

router.post("/", (req, res) => {
  if (!req.body.title || !req.body.director) {
    res.status(400).json({ error: "Missing fields in request body" });
  }
  const doesFilmExist = films.find((film) => film.title == req.body.title);
  if (doesFilmExist) {
    res
      .status(409)
      .json({ error: "A film with the provided title already exists" });
  }

  const newFilm = req.body;
  newFilm.id = films[films.length - 1].id + 1;
  films.push(newFilm);
  res.status(201).json({ film: newFilm });
});

router.get("/:id", (req, res) => {
  const film = films.find((film) => film.id == req.params.id);
  if (!film) {
    res.status(404).json({ error: "A film with provided ID does not exist" });
  }
  res.send({ film });
});

router.delete("/:id", (req, res) => {
  const removeIndex = films.findIndex((film) => film.id == req.params.id);
  if (removeIndex === -1) {
    res.status(404).json({ error: "A film with provided ID does not exist" });
  }
  const removedFilm = films[removeIndex];
  films.splice(removeIndex, 1);
  res.status(200).json({ film: removedFilm });
});

router.put("/:id", (req, res) => {
  const updateIndex = films.findIndex((film) => film.id == req.params.id);
  if (updateIndex === -1) {
    res.status(404).json({ error: "A film with provided ID does not exist" });
  }
  const doesFilmExist = films.find(
    (film) => film.id != req.params.id && film.title == req.body.title
  );
  if (doesFilmExist) {
    res
      .status(409)
      .json({ error: "A film with the provided title already exists" });
  }

  const updatedFilm = { ...films[updateIndex], ...req.body };
  films.splice(updateIndex, 1, updatedFilm);
  res.status(200).json({ film: updatedFilm });
});

module.exports = router;
