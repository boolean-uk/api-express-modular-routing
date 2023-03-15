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
const bookRouter = require("./routers/books");
const filmRouter = require("./routers/films");

// ADD ROUTERS TO APP
app.use("/users", usersRouter);
app.use("/books", bookRouter);
app.use("/films", filmRouter);

module.exports = app
