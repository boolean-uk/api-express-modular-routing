// Import data here...
const router = require("express").Router();

const data = require("../../data");
const users = data.users;
// Write routes here...
router.get("/", (req, res) => {
  res.status(200).json({users});
});

router.post("/", (req, res) => {
  const user = req.body;
  user.id = users[users.length -1].id +1;
  users.push(user);
  
  res.status(201).json({user});
})

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((item) => item.id === id);
  res.status(200).json({user});
})

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((item) => item.id === id);
  const userIndex = users.findIndex((user) => user.id === id);
  users.splice(userIndex, 1);

  res.status(200).json({user});
})

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = req.body;
  const userIndex = users.findIndex((user) => user.id === id);
  user.id = users[userIndex].id;
  users[userIndex] = user;

  res.status(200).json({user})
})

module.exports = router;