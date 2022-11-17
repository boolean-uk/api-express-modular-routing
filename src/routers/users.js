const express = require("express");
const { users } = require("../../data.js");

const userRouter = express.Router();

class WrongBodyError extends Error {
  statusCode = 400;
}
class NotFoundError extends Error {
  statusCode = 404;
}
class UserAlreadyExistError extends Error {
  statusCode = 409;
}

userRouter.get("/", (req, res) => {
  res.json({ users });
});

userRouter.post("/", (req, res) => {
  if (!req.body.email) {
    throw new WrongBodyError("Missing fields in request body");
  }
  const emailAlreadyExist = users.find((u) => u.email === req.body.email);
  if (emailAlreadyExist) {
    throw new UserAlreadyExistError(
      "A user with the provideed email already exists"
    );
  }
  const user = { email: req.body.email, id: users.length + 1 };
  users.push(user);
  res.json({ user: user });
});

userRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === Number(id));
  console.log(user);
  if (!user) {
    throw new NotFoundError(`A user with the provided ID does not exist.`);
  }
  res.json({ user: user });
});

userRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((item) => item.id === Number(id));
  if (!user) {
    throw new NotFoundError(`A user with the provided ID does not exist.`);
  }
  res.json({ user: user });
  users.splice(users.indexOf(user), 1);
});

userRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  let user = users.find((item) => item.id === Number(id));
  if (!user) {
    throw new NotFoundError(`A user with the provided ID does not exist.`);
  }
  const emailAlreadyExist = users.find((u) => u.email === req.body.email);
  if (emailAlreadyExist) {
    throw new UserAlreadyExistError(
      "A user with the provideed email already exists"
    );
  }
  user = { email: req.body };

  res.json(user.email);
});

module.exports = userRouter;
