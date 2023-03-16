// Import data here...
const router = require("express").Router();

const data = require("../../data");
const films = data.films;
// Write routes here...
router.get("/", (req, res) => {
  res.status(200).json({ films });
});

router.post("/", (req, res) => {
  const film = req.body;
  film.id = films[films.length - 1].id + 1;
  films.push(film);

  res.status(201).json({ film });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = films.find((item) => item.id === id);
  res.status(200).json({ film });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = films.find((item) => item.id === id);
  const filmIndex = films.findIndex((film) => film.id === id);
  films.splice(filmIndex, 1);

  res.status(200).json({ film });
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = req.body;
  const filmIndex = films.findIndex((film) => film.id === id);
  film.id = films[filmIndex].id;
  films[filmIndex] = film;

  res.status(200).json({ film });
});
module.exports = router;