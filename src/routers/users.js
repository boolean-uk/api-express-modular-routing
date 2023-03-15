const router = require('express').Router();

// Import data here...

const { users } = require('../../data/index.js');
const controller = require('../controllers/users.js');

// Write routes here...

router.get('/', controller.getAll);

router.get('/:id', controller.getById);

router.post('/', controller.createUser);

router.delete('/:id', controller.deleteUserById);

router.put('/:id', controller.updateUserById);

module.exports = router;
