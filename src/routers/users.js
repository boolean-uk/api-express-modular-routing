const { users } = require("../../data/index.js");

const express = require("express");
const router = express.Router();

let userCounter = 3;

router.get("/", (req, res) => {
    return res.status(200).json({ users: users });
});

function findUserByID(req, res) {
    const foundUser = users.find((user) => user.id === users.id);

    if (!foundUser)
        return res
            .status(404)
            .json({ ERROR: `A user with ID: ${req.body.id} does not exist` });
    return foundUser;
}

function emailMatch(newUser) {
    const foundEmail = users.find((email) => email.email === newUser.email);
    if (foundEmail) return true;
    return false;
}

router.post("/", (req, res) => {
    let newUser = req.body;

    if (!newUser.email) {
        return res
            .status(400)
            .json({ ERROR: "Missing fields in request body" });
    }

    if (emailMatch(newUser)) {
        return res
            .status(409)
            .json({ ERROR: "A user with the provided email already exists" });
    }

    newUser = { id: ++userCounter, ...newUser };
    users.push(newUser);

    return res.status(201).json({ user: newUser });
});

module.exports = router;
