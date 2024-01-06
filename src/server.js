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
// const 

app.use('/users', usersRouter)
app.use('/films', filmsRouter)

// ADD ROUTERS TO APP


module.exports = app
