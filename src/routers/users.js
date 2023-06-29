const express = require("express");
const { users } = require("../../data/index");
const router = express.Router();

let id = 4;

// GET users
router.get("/", (req, res) => {
  res.json({ users });
});

// POST Create a user
router.post("/", (req, res) => {
  const body = req.body;
  const newUser = { id: id, ...body };
  const checkEmail = users.find((user) => user.email === body.email)

  if (checkEmail) {
    return res.status(409).send({ error: "A user with the provided email already exists"})
  }
  if (body.email.length !== 0) {
    users.push(newUser);
    id++;
    return res.status(201).send({ user: newUser });
  } else {
    return res.status(400).send({ error: "Missing fields in request body" });
  }
});

// GET a user by ID
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  if (user) {
      return res.send({ user });
  } else {
    return res.status(404).send({ error: "A user with the provided ID does not exist"})
  }
});

// DELETE a user by ID
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  let userIndex = -1;
  const user = users.find((user, index) => {
    if (user.id === id) {
      userIndex = index;
      return true;
    } else {
      return false;
    }
  });

  if (user) {
    users.splice(userIndex, 1);
    return res.send({ user });
  } else {
    return res.status(404).send({ error: "A user with the provided ID does not exist" });
  }
});

// PUT Update a user by ID
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;
  const checkId = users.find((user) => user.id === id)
  const checkEmail = users.find((user) => user.email === body.email)

    if (body.email.length === 0) {
        return res.status(400).send({ error: "Missing fields in the request body"})
    }
    if (!checkId) {
        return res.status(404).send({ error: "A user with the provided ID does not exist"})
    }
    if (checkEmail) {
        return res.status(409).send({ error: "A user with the provided email already exists"})
    }
    if (body.email.length !== 0) {
        let updatedUser = users.find((user) => user.id === id);
        Object.assign(updatedUser, body);
        return res.send({ user: updatedUser });
    } 
});

module.exports = router;
