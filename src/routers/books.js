// Import data here...
const express = require("express");
const router = express.Router();
const { books } = require("../../data/index.js");

// Write routes here...
router.get("/", (req, res) => {
	res.json({ books });
});

router.get("/:id", (req, res) => {
	const id = Number(req.params.id);
	const book = books.find((book) => id === book.id);
	if (!book) {
		res.status(404).json("A book with provided ID does not exist");
	}
	res.json({ book });
});

router.delete("/:id", (req, res) => {
	const id = Number(req.params.id);
	const book = books.find((book) => id === book.id);

	if (!book) {
		res.status(404).send("A book with the provided ID does not exist");
	}

	books.splice(books.indexOf(book), 1);
	res.json({ book });
});

router.post("/", (req, res) => {
	if (!req.body.title || !req.body.type || !req.body.author) {
		res.status(400).json("Missing fields in request body");
	}

	const title = req.body.title;
	const bookTitle = books.find((book) => book.title === title);
	if (bookTitle) {
		res.status(409).json("A book with the provided title already exist");
	}

	let id = books.length;
	id++;
	const book = { ...req.body, id };
	books.push(book);
	res.status(201).json({ book: book });
});

router.put("/:id", (req, res) => {
	const id = Number(req.params.id);
	const book = books.find((book) => book.id === id);

	if (!book) {
		res.status(404).send("A book with the provided ID does not exist");
	}

	const title = req.body.title;
	const booktitle = books.find((book) => book.title === title);
	if (booktitle) {
		res.status(409).send("A book with the provided title already exists");
	}

	if (!req.body.title || !req.body.type || !req.body.author) {
		res.status(400).send("Missing fields in request body");
	}

	Object.keys(req.body).forEach((prop) => {
		book[prop] = req.body[prop];
		book.type = req.body.type;
		book.author = req.body.author;
	});
	res.json({ book });
});

module.exports = router;
