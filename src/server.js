const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const usersRouter = require("./routers/users");
const filmsRouter = require("./routers/films")
const booksRouter = require("./routers/books")

app.use('/users', usersRouter)
app.use('/films', filmsRouter)
app.use('/books', booksRouter)

module.exports = app;
