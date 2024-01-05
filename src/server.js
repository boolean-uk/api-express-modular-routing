const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");

// SETUP MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// REQUIRE ROUTERS
const userRouter = require("./routers/users");
const filmRouter = require("./routers/films");
const bookRouter = require("./routers/books");

// ADD ROUTERS TO APP
app.use("/users", userRouter);
app.use("/films", filmRouter);
app.use("/books", bookRouter);

module.exports = app;
