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
  if (req.body.title === undefined) {
    res.status(400).json({ error: "Missing fields in request body" });
  } else if (films.filter((film) => film === req.body.title)) {
    res
      .status(409)
      .json({ error: "A film with the provided title already exists" });
  } else {
    const film = { ...req.body, id };
    films.push(film);

    res.status(201).json({ film: film });
  }
});

router.delete("/:id", (req, res) => {
  const film = films.find((film) => film.id === Number(req.params.id));

  if (film === undefined) {
    res.status(404).json({ error: "A film with provided ID does not exist" });
  } else {
    films.splice(films.indexOf(film, 1));

    res.json({ film });
  }
});

router.put("/:id", (req, res) => {
  const film = films.find((film) => film.id === Number(req.params.id));

  if (film === undefined) {
    res.status(404).json({ error: "A film with provided ID does not exist" });
  } else if (films.filter((film) => film === req.body.title)) {
    res
      .status(409)
      .json({ error: "A film with the provided title already exists" });
  } else {
    Object.keys(req.body).forEach((item) => (film[item] = req.body[item]));

    res.status(200).json({ film: film });
  }
});

router.patch("/:id", (req, res) => {
  const film = films.find((film) => film.id === Number(req.params.id));
  const keys = ["title", "director"];
  const cantFind = keys.find((item) => !Object.keys(req.body).includes(item));
  const alreadyExists = films.find((item) => item.title === req.body.title);

  if (cantFind) {
    res.status(400).json({ error: "Missing fields in request body" });
  } else if (film === undefined) {
    res.status(404).json({ error: "A film with provided ID does not exist" });
  } else if (alreadyExists) {
    res
      .status(409)
      .json({ error: "A film with the provided title already exists" });
  } else {
    Object.assign(film, req.body);

    res.json({ film });
  }
});

router.get("/", (req, res) => {
  const filmsByDirector = films.filter(
    (item) => item.director === req.query.director
  );

  res.json(filmsByDirector);
});

module.exports = router;
