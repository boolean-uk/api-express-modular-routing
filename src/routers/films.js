const { films } = require("../../data");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ films });
});

router.get("/:id", (req, res) => {
  const film = films.find((film) => film.id === Number(req.params.id));
  if (film !== undefined) {
    res.json({ film: film });
  } else {
    res.status(404).json({ error: "A film with provided ID does not exist" });
  }
});

router.post("/", (req, res) => {
  let id = films[films.length - 1].id + 1;

  const film = { ...req.body, id };
  films.push(film);
  res.status(201).json({ film: film });
});

router.delete("/:id", (req, res) => {
  const film = films.find((film) => film.id === Number(req.params.id));
  films.splice(films.indexOf(film, 1));

  res.json({ film });
});

router.put("/:id", (req, res) => {
  const film = films.find((film) => film.id === Number(req.params.id));
  Object.keys(req.body).forEach((item) => (film[item] = req.body[item]));

  res.status(200).json({ film: film });
});

module.exports = router;
