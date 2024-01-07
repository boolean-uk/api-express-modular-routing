const express = require("express");
const router = express.Router();
const data = require("../../data/index.js");
const currentFilmId = 5;
const films = data.films;
const findFilm = (req, res) => {
  const filmId = Number(req.params.id);

  const foundFilm = films.find((film) => film.id === filmId);

  if (!foundFilm) {
    res.status(404).json({ error: `No such post with ID: ${filmId}` });
  }

  return foundFilm;
};
router.get("/", (req, res) => {
  res.status(200).json({ films: films });
});
router.post("/", (req, res) => {
  const { title, director } = req.body;
  const newFilm = {
    id: currentFilmId,
    title,
    director,
  };
  films.push(newFilm);
  res.status(201).json({ film: newFilm });
});
router.get("/:id", (req, res) => {
  const film = findFilm(req, res);
  if (film) {
    res.status(200).json({ film: film });
  }
});
router.delete("/:id",(req, res) => {
    const film = findFilm(req, res)

  if (film) {
    const filmIndex = films.indexOf(film)
    const deletedFilm = films[filmIndex];
    films.splice(filmIndex, 1)
  
    return res.status(200).json({ film: deletedFilm, message: 'Successfully deleted film' });
  }
})
router.put('/:id', (req, res) => {
    const film = findFilm(req, res)
  
    if (film) {
      const { title, director } = req.body
      film.title = title
      film.director = director
      
    
      return res.json({film: film})
    }
  })
module.exports = router;
