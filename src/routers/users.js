const express = require("express");
const router = express.Router();
const { users } = require("../../data/index.js");

router.get("/", (req, res) => {
	console.log({ users });
	res.json({ users });
});

router.get("/:id", (req, res) => {
	const id = Number(req.params.id);
	const user = users.find((user) => user.id === id);

	console.log({ user });
	res.json({ user });
});

router.post("/", (req, res) => {
	let userId = users.length;
	userId++;

	const user = { ...req.body, id: userId };

	users.push(user);

	res.status(201).json({ user: user });
});

router.delete("/:id", (req, res) => {
	const id = Number(req.params.id);
	const user = users.find((user) => user.id === id);

	users.splice(users.indexOf(user), 1);

	res.json({ user });
});

router.put("/:id", (req, res) => {
	const id = Number(req.params.id);
	const user = users.find((user) => user.id === id);
	Object.keys(req.body).forEach((prop) => {
		user[prop] = req.body[prop];
	});
	res.json({ user });
});

module.exports = router;
