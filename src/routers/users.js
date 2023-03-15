const {users} = require('../../data')
const router = require('express').Router()

router.get('/', (req, res) => {
    res.json({ users })
})

router.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find((obj) => obj.id === id)
    res.json({ user })
})

router.post('/', (req, res) => {
    const id = users[users.length - 1].id + 1
    const user = {...req.body, id}
    users.push(user)
    res.status(201).json({user})
})

router.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find((obj) => obj.id === id)
    Object.keys(req.body).forEach((prop) => user[prop] = req.body[prop])
    res.status(201).json({user})
})
router.delete('/:id', (req, res) => {
    const user = users.find((obj) => obj.id === Number(req.params.id) )
    const index = users.indexOf(user)
    users.splice(index, 1)
    res.status(201).json({user})

})

module.exports = router