const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const usersRouter = require("./resources/users/router");

const app = express();

/* SETUP MIDDLEWARE */

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

/* SETUP ROUTES */

app.use("/users", usersRouter);

app.get("*", (req, res) => {
  res.json({ ok: true });
});

/* START SERVER */

const port = 3030;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
