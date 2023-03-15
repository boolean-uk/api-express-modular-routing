const { films } = require("../../data");
const router = require("express").Router();

let id = films.length;

router.get("/", (req, res) => {
  res.status(200).json({ films });
});

//GET /films/:id
router.get("/:id", (req, res) => {
  //   ... code
  const id = Number(req.params.id);
  const film = films.find((film) => film.id === id);
  res.json({ film });
});

//POST
router.post("/", (req, res) => {
  id++;
  const film = { ...req.body, id };
  films.push(film);

  // if missing fields: res(400)({"missing fields in req body"})
  // if already exists: res(409)({"film already exists"})

  res.status(201).json({ film });
});

//DELETE
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = films.findIndex((person) => person.id === id);
  const film = films.splice(index, 1)[0];
  // ...find
  // if !id: 404({"film doesn't exist"})
  res.status(200).json({ film });
});

//PUT (update) by id
router.put("/:id", (req, res) => {
  //    ...code
  const foundfilm = films.find((film) => film.id === Number(req.params.id));

  const film = { ...foundfilm, ...req.body };
  console.log("film:", film);
  films[films.indexOf(foundfilm)] = film;

  // if missing fields: res(400)({"missing fields in req body"})
  // if doesn't exist: res(404)({"film doesn't exist"})
  // if already exists: res(409)({"film already exists"})
  res.status(200).json({ film });
});

module.exports = router;
