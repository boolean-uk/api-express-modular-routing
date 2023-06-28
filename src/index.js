/* REQUIRE APP */
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");

const app = express()
const port = 3030;

// ROUTES
const usersRouter = require("./routers/users.js")
const filmsRouter = require("./routers/films.js")

// SETUP MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"))

app.use('/users', usersRouter)
app.use('/films', filmsRouter)

/* START SERVER */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
