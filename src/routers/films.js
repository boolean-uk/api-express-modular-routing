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

module.exports = router;
