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
app.use('/users', userRouter)
const bookRouter = require("./routers/books");
app.use('/books', bookRouter)
const filmRouter = require("./routers/films");
app.use('/films', filmRouter)

// ADD ROUTERS TO APP


module.exports = app
