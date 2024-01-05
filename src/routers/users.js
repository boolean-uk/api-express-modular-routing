const express = require("express");
const router = express.Router();

const data = require("../../data/index.js");
const {user1, user2} = require('../../test/fixtures/userData.js')

let currentId = 3

const findUser = (req, res) => {
  const userId = Number(req.params.id);

  const findUser = data.users.find((user) => user.id === userId);

  if (!findUser) {
    res
      .status(404)
      .json({ error: "A user with the provided ID does not exist" });
  }

  return findUser;
};

router.get("/", (re, res) => {
  return res.status(200).json({ users: data.users });
});

router.get("/:id", (req, res) => {
  const user = findUser(req, res);

  return res.status(200).json({ user });
});


router.post('/', (req, res) => {
    const body = user1;

    const newUser = {
      id: ++currentId,
      ...body,
    };
  
    data.users.push({ ...newUser });
  
    // 'Missing fields in request body'

    res.status(201).json({ user: newUser });
})


module.exports = router;
