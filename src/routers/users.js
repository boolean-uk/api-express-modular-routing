const express = require("express");
const router = express.Router();
let { users } = require("../../data/index");

let newId = users.length;

router.get("/", (req, res) => {
  return res.send({ users });
});

router.post("/", (req, res) => {
  newId++;
  const newUser = {
    ...req.body,
    id: newId,
  };

  const emailExists = users.some((user) => user.email === newUser.email);

  if (emailExists) {
    return res
      .status(409)
      .send({ error: "A user with the provided email already exists" });
  }

  if (newUser.email !== "" && newUser.email !== undefined) {
    users.push(newUser);
    return res.status(201).send({ user: newUser });
  }

  return res.status(400).send({ error: "Missing fields in the request body" });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res
      .status(404)
      .send({ error: "A user with the provided ID does not exist" });
  }

  return res.send({ user });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const userToDelete = users.find((u) => u.id === id);

  if (userToDelete) {
    users = users.filter((u) => u.id !== id);
    return res.send({ user: userToDelete });
  } else {
    return res
      .status(404)
      .send({ error: "A user with the provided ID does not exist" });
  }
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedUser = req.body;
  const userToUpdate = users.find((u) => u.id === id);

  if (userToUpdate) {
    const emailExists = users.some((u) => u.email === updatedUser.email);

    if (emailExists) {
      return res
        .status(409)
        .send({ error: "A user with the provided email already exists" });
    }

    Object.assign(userToUpdate, updatedUser);
    const newUser = users.find((u) => u.id === id);
    return res.send({ user: newUser });
  } else {
    return res
      .status(404)
      .send({ error: "A user with the provided ID does not exist" });
  }
});

module.exports = router;
