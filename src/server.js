const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");

// SETUP MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// REQUIRE ROUTERS
const users = require("./routers/users");
const films = require("./routers/films")

// ADD ROUTERS TO APP
app.use('/users', users)
app.use('/films', films)

module.exports = app
