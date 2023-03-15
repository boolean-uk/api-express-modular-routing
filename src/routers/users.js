const { users } = require("../../data");
const router = require("express").Router();

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
  let id = users[users.length - 1].id + 1;
  if (req.body.email === undefined) {
    res.status(400).json({ error: "Missing fields in request body" });
  } else if (users.filter((user) => user === req.body.email)) {
    res
      .status(409)
      .json({ error: "A user with the provided email already exists" });
  } else {
    const user = { ...req.body, id };
    users.push(user);

    res.status(201).json({ user: user });
  }
});

router.delete("/:id", (req, res) => {
  const user = users.find((user) => user.id === Number(req.params.id));
  users.splice(users.indexOf(user, 1));

  res.status(201).json({ user });
});

router.put("/:id", (req, res) => {
  const user = users.find((user) => user.id === Number(req.params.id));
  Object.keys(req.body).forEach((item) => (user[item] = req.body[item]));

  res.status(201).json({ user: user });
});

module.exports = router;
