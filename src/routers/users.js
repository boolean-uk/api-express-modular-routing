// For the data, import the module from the file
const { users } = require("../../data");

// This enables the use of express router
const router = require("express").Router();

// ROUTES

router.get("/", (req, res) => {
  res.json({ users });
});

router.get("/:id", (req, res) => {
  const user = findUser(req.params.id);
  res.json({ user });
});

router.post("/", (req, res) => {
  const newId = users[users.length - 1].id + 1;
  const user = { ...req.body, id: newId };
  users.push(user);
  res.status(201).json({ user });
});

router.put("/:id", (req, res) => {
  const user = findUser(req.params.id);
  const updatedUser = { id: user.id, ...req.body };
  users[users.indexOf(user)] = updatedUser;
  res.status(201).json({ user: updatedUser });
});

router.delete("/:id", (req, res) => {
  const user = findUser(req.params.id);
  users.splice(users.indexOf(user), 1);
  res.status(201).json({ user });
});

function findUser(id) {
  return users.find((user) => user.id == id);
}

// const contact = contacts.find((contact) => contact.id == req.params.id);
//   console.log("DEL Contact --> ", contact);
//   contacts.splice(contacts.indexOf(contact), 1);

// app.put("/contacts/:id", (req, res) => {
//     const contactReq = req.body;
//     contactReq.id = Number(req.params.id);
//     const contact = contacts.find((contact) => contact.id == req.params.id);
//     contacts[contacts.indexOf(contact)] = contactReq;
//     res.json({ contact: contactReq });
//   });
module.exports = router;
