// user router

//users from data
const { users } = require("../../data/index.js")

//create express router
const router = require('express').Router()


router.get('/', (req, res) => {
    res.json({ users })
});

router.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const found = users.find((user) => user.id === id)

    //  if(!found) {
    //     res.status(404).json("User not found")
    //  }
    res.json({ user: found })
})

router.post('/', (req, res) => {
    const newUser = { ...req.body, id }
    users.push(newUser)
    res.status(201).json({user: newUser})
})

router.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    const found = users.find((user) => user.id === id)
    const updatedUser = { ...found, ...req.body }
    users[users.indexOf(found)] = updatedUser
    res.status(201).json({ user: updatedUser })
})

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    const index = users.findIndex((user) => user.id === id)
    const user = users.splice(index, 1)[0]
    res.status(201).json({ user })

})

module.exports = router;