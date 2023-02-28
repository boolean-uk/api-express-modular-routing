const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");

// SETUP MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// REQUIRE ROUTERS
// users
const usersRouter = require("./routers/users");
// films
const filmsRouter = require("./routers/films");
// books
const booksRouter = require("./routers/books");

// ADD ROUTERS TO APP
// users
app.use("/users", usersRouter);
// films
app.use("/films", filmsRouter);
// books
app.use("/books", booksRouter);

module.exports = app;
