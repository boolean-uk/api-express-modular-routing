const { users } = require("../../data");
const router = require("express").Router();

//don't rewrite 'users' because there is the use of a compund path in server.js line 'app.use("/users", usersRouter)':

let id = users.length;

router.get("/", (req, res) => {
  res.status(200).json({ users });
});

//GET /users/:id
router.get("/:id", (req, res) => {
  //   ... code
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  res.json({ user });
});

//POST
router.post("/", (req, res) => {
  id++;
  const newUser = { ...req.body, id };
  users.push(newUser);

  // if missing fields: res(400)({"missing fields in req body"})
  // if already exists: res(409)({"user already exists"})

  res.status(201).json({ user: newUser });
});

//DELETE
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((person) => person.id === id);
  const user = users.splice(index, 1)[0];
  // ...find
  // if !id: 404({"user doesn't exist"})
  res.status(201).json({ user });
});

//PUT (update) by id
router.put("/:id", (req, res) => {
  //    ...code
  const foundUser = users.find((user) => user.id === Number(req.params.id));

  const user = { ...foundUser, ...req.body };
  console.log("user:", user);
  users[users.indexOf(foundUser)] = user;

  // if missing fields: res(400)({"missing fields in req body"})
  // if doesn't exist: res(404)({"user doesn't exist"})
  // if already exists: res(409)({"user already exists"})
  res.status(201).json({ user });
});

module.exports = router;
