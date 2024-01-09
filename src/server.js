const express = require("express");
const app = express();

const morgan = require("morgan");
const cors = require("cors");


const usersRouter = require("./routers/users");
const filmsRouter = require("./routers/films");
const booksRouter = require("./routers/books");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/films", filmsRouter);
app.use("/books", booksRouter);
