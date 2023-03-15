const {users} = require('../../data')
const router = require('express').Router()

router.get('/', (req, res) => {
    res.json({ users })
})

router.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find((obj) => obj.id === id)
    if (user === undefined) {
        res.status(404).json({ error: "A user with the provided ID does not exist" })
    }
    else {
        res.status(200).json({ user })
    }
})

router.post('/', (req, res) => {
    const expectedKeys = ["email"]
    const dontMatch = expectedKeys.find((item) => !Object.keys(req.body).includes(item))
    const found = users.find((obj) => obj.email === req.body.email)
    if(dontMatch) {
        res.status(400).json({ error: "Missing fields in request body" })
    } else if(found !== undefined) {
        res.status(409).json({ error: 'A user with the provided email already exists'})
    } else {
        const id = users[users.length - 1].id + 1
        const user = {...req.body, id}
        users.push(user)
        res.status(201).json({user})
    }
})

router.put('/:id', (req, res) => {
    const user = users.find((obj) => obj.id === Number(req.params.id))
    const found = users.find((obj) => obj.email === req.body.email)
    if(user === undefined) {
        res.status(404).json({ error: 'A user with the provided ID does not exist'})
    }  else if(found !== undefined) {
        res.status(409).json({ error: 'A user with the provided email already exists'})
    } else {
        Object.keys(req.body).forEach((prop) => user[prop] = req.body[prop])
        res.status(200).json({user})
    }
})
router.delete('/:id', (req, res) => {
    const user = users.find((obj) => obj.id === Number(req.params.id))
    if(user === undefined) {
        res.status(404).json({ error: 'A user with the provided ID does not exist'})
    } else {
        const index = users.indexOf(user)
        users.splice(index, 1)
        res.status(200).json({user})
    }
})

module.exports = router