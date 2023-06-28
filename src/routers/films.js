const express = require("express");
const { films } = require("../../data/index.js");
const filmsRouter = express.Router();
let idNum = films.length;

const findFilmByID = (id) => {
  const res = films.find((film) => {
    return film.id === Number(id);
  });
  return res;
};

// 1 - GET - Retrieve a list of films
filmsRouter.get("/", (req, res) => {
  return res.send({ films });
});

// 2 - POST - Create a film
filmsRouter.post("/", (req, res) => {
  const title = req.body.title;
  const director = req.body.director;
  idNum++;
  const film = {
    id: Number(idNum),
    title: title,
    director: director,
  };
  films.push(film);
  return res.status(201).send({ film });
});

// 3 - Get a film by ID
filmsRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const film = findFilmByID(Number(id));

  if (film) {
    return res.send({ film });
  } else {
    return res.status(404).send("A film with the provided ID does not exist");
  }
});

// 4 - DEL - Delete a film by ID
filmsRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const film = findFilmByID(Number(id));

  const filmIdx = films.findIndex((item) => {
    return item === film;
  });

  if (film) {
    const film = films.splice(filmIdx, 1)[0];
    return res.send({ film });
  } else {
    return res.status(404).send("A film with the provided ID does not exist");
  }
});

// 5 - PUT - Update a film by ID
filmsRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const film = findFilmByID(Number(id));
  const title = req.body.title;
  const director = req.body.director

  const filmIdx = films.findIndex((item) => {
    return item === film;
  });

  if (film) {
    films[filmIdx].title = title;
    films[filmIdx].director = director;

    return res.send({ film });
  } else {
    return res.status(404).send("A film with the provided ID does not exist");
  }
});

module.exports = filmsRouter;
