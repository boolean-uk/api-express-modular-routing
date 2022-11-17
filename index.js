const express = require("express");
const app = express();
const port = 3030;

const cors = require("cors");
const morgan = require("morgan");

// SETUP MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// REQUIRE ROUTERS
const usersRouter = require("./src/routers/users");
const filmsRouter = require("./src/routers/films");
const booksRouter = require("./src/routers/books");

// ADD ROUTERS TO APP

app.use("/users", usersRouter);
app.use("/films", filmsRouter);
app.use("/books", booksRouter);
app.use((error, req, res, next) => {
  if (error.statusCode) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  // console.log('ERROR: ',error.status)
  res
    .status(500)
    .json({
      message:
        "Oops, sorry! this is on us. Don't worry, a develevoper will be punish for this :)",
    });
});
/* START SERVER */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
