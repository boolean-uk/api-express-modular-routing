const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");

// SETUP MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// DATA


// REQUIRE ROUTERS
const usersRouter = require("./routers/users");
const filmsRouter = require("./routers/films")
const bookRouter = require("./routers/books")

app.use('/users', usersRouter)
app.use('/films', filmsRouter)
app.use('/books', bookRouter)

// ADD ROUTERS TO APP


module.exports = app
