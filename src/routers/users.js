// const { users } = require("../../data");
const router = require("express").Router();

// //don't rewrite 'users' because there is the use of a compund path in server.js line 'app.use("/users", usersRouter)':

const usersControllers = require("../controllers/users");

router.get("/", usersControllers.getAll);
router.post("/", usersControllers.createUser);

// By ID
router.get("/:id", usersControllers.getByID);
router.delete("/:id", usersControllers.deleteUser);
router.put("/:id", usersControllers.updateUserDetails);

// let id = users.length;

// router.get("/", (req, res) => {
//   res.json({ users });
// });

// router.get("/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const user = users.find((user) => user.id === id);
//   res.json({ user });
// });

// router.post("/", (req, res) => {
//   id++;
//   const newUser = { ...req.body, id };
//   users.push(newUser);

//   res.status(201).json({ user: newUser });
// });

// router.delete("/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const index = users.findIndex((person) => person.id === id);
//   const user = users.splice(index, 1)[0];

//   res.status(201).json({ user });
// });

// router.put("/:id", (req, res) => {
//   const foundUser = users.find((user) => user.id === Number(req.params.id));

//   const user = { ...foundUser, ...req.body };
//   console.log("user:", user);
//   users[users.indexOf(foundUser)] = user;

//   res.status(201).json({ user });
// });

module.exports = router;
