const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");

// SETUP MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// REQUIRE ROUTERS
const usersRouter = require("./routers/users");
const filmsRouter = require("./routers/films")
const booksRouter = require("./routers/books")

app.use('/users', usersRouter)
app.use('/films', filmsRouter)
app.use('/books', booksRouter)

const users = usersRouter
let films = filmsRouter
let books = booksRouter

// ADD ROUTERS TO APP


module.exports = app;
