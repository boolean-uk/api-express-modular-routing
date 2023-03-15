const router = require("express").Router();
const { users } = require("../../data/index");

router.get("/", (req, res) => {
  res.send({ users });
});

router.post("/", (req, res) => {
  if (!req.body.email) {
    res.status(400).json({ error: "Missing fields in request body" });
  }
  const foundUser = users.find((user) => user.email === req.body.email);
  if (foundUser) {
    res
      .status(409)
      .json({ error: "A user with the provided email already exists" });
  }

  const newUser = req.body;
  newUser.id = users[users.length - 1].id + 1;
  users.push(newUser);
  res.status(201).json({ user: newUser });
});

router.get("/:id", (req, res) => {
  const user = users.find((user) => user.id == req.params.id);

  if (!user) {
    res
      .status(404)
      .json({ error: "A user with the provided ID does not exist" });
  }

  res.send({ user });
});

router.delete("/:id", (req, res) => {
  const removeIndex = users.findIndex((user) => user.id == req.params.id);
  if (removeIndex === -1) {
    res
      .status(404)
      .json({ error: "A user with the provided ID does not exist" });
  }

  const removedUser = users[removeIndex];
  users.splice(removeIndex, 1);
  res.status(201).json({ user: removedUser });
});

router.put("/:id", (req, res) => {
  if (!req.body.email) {
    res.status(400).json({ error: "Missing fields in the request body" });
  }

  const userIndex = users.findIndex((user) => user.id == req.params.id);
  if (userIndex === -1) {
    res
      .status(404)
      .json({ error: "A user with the provided ID does not exist" });
  }

  const isEmailTaken = users.find(
    (user) => user.id != req.params.id && user.email == req.body.email
  );

  if (isEmailTaken) {
    res
      .status(409)
      .json({ error: "A user with the provided email already exists" });
  }

  const updatedUser = { ...users[userIndex], ...req.body };
  users.splice(userIndex, 1, updatedUser);
  res.status(201).json({ user: updatedUser });
});

module.exports = router;
