const { users } = require('../../data');

const getAll = (req, res) => {
    res.json({ users });
};

const getById = (req, res) => {
    const user = users.find((user) => user.id === Number(req.params.id));
    if (user === undefined) {
        res.status(404).json({
            error: 'A user with the provided ID does not exist',
        });
    }
    res.json({ user });
};

const createUser = (req, res) => {
    // alternative way:
    // let id = users[users.length - 1].id + 1;
    // const newUser = { ...req.body, id };
    if (req.body.email === undefined) {
        res.status(400).json({ error: 'Missing fields in request body' });
    }
    if (users.find((user) => user.email === req.body.email) !== undefined) {
        res.status(409).json({
            error: 'A user with the provided email already exists',
        });
    }
    const newUser = req.body;
    newUser.id = users[users.length - 1].id + 1;
    users.push(newUser);
    res.status(201).json({ user: newUser });
};

const deleteUserById = (req, res) => {
    const user = users.find((user) => user.id === Number(req.params.id));
    if (user === undefined) {
        res.status(404).json({
            error: 'A user with the provided ID does not exist',
        });
    }
    users.splice(users.indexOf(user, 1));
    res.status(201).json({ user });
};

const updateUserById = (req, res) => {
    const user = users.find((user) => user.id === Number(req.params.id));
    if (user === undefined) {
        res.status(404).json({
            error: 'A user with the provided ID does not exist',
        });
    }
    if (users.find((user) => user.email === req.body.email) !== undefined) {
        res.status(409).json({
            error: 'A user with the provided email already exists',
        });
    }
    Object.keys(req.body).forEach((item) => (user[item] = req.body[item]));
    res.status(201).json({ user });
};

module.exports = {
    getAll,
    getById,
    createUser,
    deleteUserById,
    updateUserById,
};
