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
    
  const title = films.find((film) => film.title === newFilm.title);

  if(title) {
    return res
    .status(409)
    .send({ error: "A film with the provided title already exists" });
  }

 if (newFilm.title !== "" && newFilm.title !== undefined) {
    films.push(newFilm)
    return res.status(201).send({film: newFilm})
  }
  return res.status(400).send({ error: "Missing fields in request body" });

  })

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)  
  const film = films.find((film) => film.id === id)
  if (!film) {
    return res
      .status(404)
      .send({ error: "A film with provided ID does not exist" });
  }
  return res.status(200).send({ film: film})
})

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)  
  const film = films.find((film) => film.id === id)

  if(film) {
    const filmIndex = films.indexOf(film)
    films.splice(filmIndex, 1)
  
    return res.send({film: film})
  }
  else {
    return res
      .status(404)
      .send({ error: "A film with provided ID does not exist" });
  }

})

router.put('/:id', (req, res) => {
  const id = Number(req.params.id)
  const updatedFilm = req.body
  const filmToUpdate = films.find((film) => film.id === id)
  if(filmToUpdate) {

    const title = films.find((film) => film.title === updatedFilm.title);

    if(title) {
      return res
      .status(409)
      .send({ error: "A film with the provided title already exists" });
    }
    Object.assign(filmToUpdate, updatedFilm)
    const newFilm = films.find((film) => film.id === id)
    return res.send({film: newFilm})
  }
  
  else {
    return res
      .status(404)
      .send({ error: "A film with provided ID does not exist" });
  }
  
})

module.exports = router;
