/* REQUIRE APP */
// const cors = require("cors");
// const morgan = require("morgan");
// const express = require("express");

const app = require('./server.js')
const port = 3030;

// // ROUTES
// const usersRouter = require("./routers/users.js")
// const filmsRouter = require("./routers/films.js")
// const booksRouter = require("./routers/books.js")

// SETUP MIDDLEWARE
// app.use(cors());
// app.use(express.json());
// app.use(morgan("dev"))

// app.use('/users', usersRouter)
// app.use('/films', filmsRouter)
// app.use('/books', booksRouter)

/* START SERVER */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
