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

  const email = users.find((user) => user.email === newUser.email);

  if (email) {
    return res
      .status(409)
      .send({ error: "A user with the provided email already exists" });
  }
 if (newUser.email !== "" && newUser.email !== undefined) {
    users.push(newUser);
    return res.status(201).send({ user: newUser });
  }

  return res.status(400).send({ error: "Missing fields in request body" });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res
      .status(404)
      .send({ error: "A user with the provided ID does not exist" });
  }
  return res.send({ user: user });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const userDel = users.find((user) => user.id === id);
  if (userDel) {
    users = users.filter((user) => user.id !== id);
    return res.send({ user: userDel });
  } else {
    return res
      .status(404)
      .send({ error: "A user with the provided ID does not exist" });
  }
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedUser = req.body
  const userToUpdate = users.find((user) => user.id === id);

  if (userToUpdate) {

    const email = users.find((user) => user.email === updatedUser.email);

    if (email) {
      return res
        .status(409)
        .send({ error: "A user with the provided email already exists" });
    }
    Object.assign(userToUpdate, updatedUser)
    const newUser = users.find((user) => user.id === id)
    return res.send({ user: newUser });
  } else {
    return res
      .status(404)
      .send({ error: "A user with the provided ID does not exist" });
  }
});

module.exports = router;
