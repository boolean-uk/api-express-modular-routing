const express = require("express");
const router = express.Router();

const users = require("../../data/index").users;

let userId = 3;

const findUserById = (req, res) => {
  const userId = Number(req.params.id);

  const foundUser = users.find((user) => user.id === userId);

  if (!foundUser) {
    res
      .status(404)
      .send({ error: "A user with the provided ID does not exist" });
  }

  return foundUser;
};

router.get("/", (req, res) => {
  return res.status(200).send({ users: users });
});

router.post("/", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ error: "Missing fields in request body" });
  }

  const emailExists = users.some((user) => user.email === email);

  if (emailExists) {
    return res
      .status(409)
      .send({ error: "A user with the provided email already exists" });
  }

  const newUser = {
    email: email,
    id: ++userId,
  };

  users.push(newUser);

  res.status(201).send({ user: newUser });
});

router.get("/:id", (req, res) => {
  const foundUser = findUserById(req, res);

  if (foundUser) {
    return res.status(200).send({ user: foundUser });
  }

  return foundUser;
});

router.delete("/:id", (req, res) => {
  const foundUser = findUserById(req, res);

  if (foundUser) {
    const userIndex = users.indexOf(foundUser);

    users.splice(userIndex, 1);

    return res.status(200).send({ user: foundUser });
  }

  return foundUser;
});

router.put("/:id", (req, res) => {
  const foundUser = findUserById(req, res);
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ error: "Missing fields in request body" });
  }

  const emailExists = users.some((user) => user.email === email);

  if (emailExists) {
    return res
      .status(409)
      .send({ error: "A user with the provided email already exists" });
  }

  if (foundUser) {
    const userIndex = users.indexOf(foundUser);

    const updatedUser = {
      email: email,
      id: foundUser.id,
    };

    users[userIndex] = updatedUser;

    return res.status(200).send({ user: updatedUser });
  }

  return foundUser;
});

module.exports = router;
