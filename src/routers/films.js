const express = require("express");
const { films } = require("../../data.js");

const filmsRouter = express.Router();

class WrongBodyError extends Error {
  statusCode = 400;
}
class NotFoundError extends Error {
  statusCode = 404;
}
class FilmAlreadyExistError extends Error {
  statusCode = 409;
}

filmsRouter.get("/", (req, res) => {
  res.json({ films });
});

filmsRouter.post("/", (req, res) => {
  if (!req.body.title) {
    throw new WrongBodyError("Missing fields in request body");
  }
  const filmAlreadyExist = films.find((u) => u.title === req.body.title);
  if (filmAlreadyExist) {
    throw new FilmAlreadyExistError(
      "A film with the provideed title already exists"
    );
  }
  const film = {
    title: req.body.title,
    director: req.body.director,
    id: films.length + 1,
  };
  films.push(film);
  res.json({ film: film });
});

filmsRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const film = films.find((u) => u.id === Number(id));
  if (!film) {
    throw new NotFoundError(`A film with the provided ID does not exist.`);
  }
  res.json({ film: film });
});

filmsRouter.get("/", (req, res) => {
  console.log(req.query);
  let directors;
  if (req.query.director) {
    directors = films.find(
      (f) => f.director.toLowerCase() === req.query.director.toLocaleLowerCase()
    );
  }
  console.log(directors);
  res.json(directors);
});

filmsRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const film = films.find((item) => item.id === Number(id));
  if (!film) {
    throw new NotFoundError(`A film with the provided ID does not exist.`);
  }
  res.json({ film: film });
  films.splice(films.indexOf(film), 1);
});

filmsRouter.put("/:id", (req, res) => {
  const { id } = req.params;

  const filmExistAlready = films.find((film) => film.title === req.body.title);
  if (filmExistAlready) {
    throw new FilmAlreadyExistError(
      "A film with the provideed title already exists"
    );
  }
  const newFilms = films.map((element) => {
    if (element.id === Number(id)) {
      element = {
        ...element,
        title: req.body.title,
        director: req.body.director,
      };
    }
    return element;
  });
  let film = newFilms.find((item) => item.id === Number(id));
  if (!film) {
    throw new NotFoundError(`A film with the provided ID does not exist.`);
  }
  res.json({ film: film });
});

filmsRouter.patch("/:id", (req, res) => {
  const { id } = req.params;
  const filmExistAlready = films.find((film) => film.title === req.body.title);
  if (filmExistAlready) {
    throw new FilmAlreadyExistError(
      "A film with the provideed title already exists"
    );
  }
  const newFilms = films.map((element) => {
    if (element.id === Number(id)) {
      element = { id: element.id, ...req.body };
    }
    return element;
  });
  let film = newFilms.find((item) => item.id === Number(id));
  if (!film) {
    throw new NotFoundError(`A film with the provided ID does not exist.`);
  }
  res.json({ film: film });
});

module.exports = filmsRouter;
