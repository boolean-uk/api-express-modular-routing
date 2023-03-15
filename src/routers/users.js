const { users } = require("../../data");
const router = require("express").Router();

// //don't rewrite 'users' because there is the use of a compund path in server.js line 'app.use("/users", usersRouter)':

const usersControllers = require("./../controllers/users");

router.get("/", usersControllers.getAll);
router.post("/", usersControllers.createUser);

// By ID
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = usersControllers.getByID(id);
  if (user) {
    res.status(200).json({ user });
  } else {
    //return error
  }
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = usersControllers.deleteUser(id);
  if (user) {
    res.status(200).json({ user });
  } else {
    throw new Error("Error with deleting user");
  }
});

router.put("/:id", (req, res) => {
  const foundUser = users.find((user) => user.id === Number(req.params.id));

  const user = { ...foundUser, ...req.body };
  console.log("user:", user);
  users[users.indexOf(foundUser)] = user;

  res.status(200).json({ user });
});

module.exports = router;
