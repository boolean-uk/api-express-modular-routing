const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");

// SETUP MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// REQUIRE ROUTERS
const usersRouter = require("./routers/users.js");
const booksRouter = require("./routers/books.js");
const filmsRouter = require("./routers/films.js");

// ADD ROUTERS TO APP
app.use("/users", usersRouter);
app.use('/books', booksRouter)
app.use('/films', filmsRouter)

module.exports = app;
