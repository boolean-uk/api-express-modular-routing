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
app.use("/users", usersRouter)

const filmsRouter = require("./routers/films");
app.use("/films", filmsRouter)


// ADD ROUTERS TO APP


module.exports = app
