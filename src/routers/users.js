// Import data here...
const { users } = require("../../data");
const router = require("express").Router();
// Write routes here...
router.get("/", (req, res) => {
  res.json({ users });
});

router.get("/:id", (req, res) => {
  const user = users.find((user) => user.id === Number(req.params.id));
  if (user !== undefined) {
    res.json({ user: user });
  } else {
    res
      .status(404)
      .json({ error: "A user with the provided ID does not exist" });
  }
});

router.post("/", (req, res) => {
  const alreadyExists = users.find((user) => user.email === req.body.email);

  if (req.body.email === undefined) {
    res.status(400).json({ error: "Missing fields in request body" });
  } else if (alreadyExists !== undefined) {
    res
      .status(409)
      .json({ error: "A user with the provided email already exists" });
  } else {
    let id = users[users.length - 1].id + 1;
    const user = { ...req.body, id };
    users.push(user);

    res.status(201).json({ user });
  }
});

router.delete("/:id", (req, res) => {
  const user = users.find((user) => user.id === Number(req.params.id));
  if (user === undefined) {
    res
      .status(404)
      .json({ error: "A user with the provided ID does not exist" });
  } else {
    users.splice(users.indexOf(user, 1));

    res.status(201).json({ user });
  }
});

router.put("/:id", (req, res) => {
  const alreadyExists = users.find((user) => user.email === req.body.email);
  const user = users.find((user) => user.id === Number(req.params.id));

  if (req.body.email === undefined) {
    res.status(400).json({ error: "Missing fields in request body" });
  } else if (user === undefined) {
    res
      .status(404)
      .json({ error: "A user with the provided ID does not exist" });
  } else if (alreadyExists !== undefined) {
    res
      .status(409)
      .json({ error: "A user with the provided email already exists" });
  } else {
    Object.keys(req.body).forEach((item) => (user[item] = req.body[item]));

    res.status(201).json({ user: user });
  }
});

module.exports = router;
