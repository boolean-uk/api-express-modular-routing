const express = require("express");
const app = express();
const port = 3030

const cors = require("cors");
const morgan = require("morgan");

// SETUP MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// REQUIRE ROUTERS
const usersRouter = require("./routers/users");

// ADD ROUTERS TO APP

// *** USERS ***

// 1 - GET - Retrieve a list of users
app.use('/users', usersRouter)

// 2 - POST - Create a user

// 3 - Get a user by ID

// 4 - DEL - Delete a user by ID

// 5 - PUT - Update a user by ID

// app.listen(port, () => {
//   console.log(`server is running on http://localhost:${port}`)
// })

module.exports = app
