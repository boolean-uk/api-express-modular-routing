const express = require("express");
const router = express.Router();
let { films } = require("../../data/index");

let newId = films.length;

router.get("/", (req, res) => {
  return res.send({ films });
});

router.post('/', (req, res) => {
    newId++
    const newFilm = {
      ...req.body,
      id: newId
    }
    films.push(newFilm)
    return res.status(201).send({film: newFilm})
  })

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)  
  const film = films.find((film) => film.id === id)

  return res.status(200).send({ film: film})
})

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)  
  const film = films.find((film) => film.id === id)

  const filmIndex = films.indexOf(film)
  films.splice(filmIndex, 1)

  return res.send({film: film})
})

router.put('/:id', (req, res) => {
  const id = Number(req.params.id)
  const updatedFilm = req.body
  const filmToUpdate = films.find((film) => film.id === id)

  Object.assign(filmToUpdate, updatedFilm)

  const newFilm = films.find((film) => film.id === id)
  return res.send({film: newFilm})
})

module.exports = router;
