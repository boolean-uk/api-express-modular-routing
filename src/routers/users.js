
const express = require('express')
const router = express.Router()
const usersData = require('../../data/index.js').users


/*let userId = 3*/
//check
/*router.get('/:id', (req, res) => {

    const foundId = Number(req.params.id)
    const foundUser = usersData.find((user) => user.id === foundId)


    if (!foundId) {
        res.status(404).json({ users: `not user found id ${foundId}` })
    }
    return res.status(200).json({ users: foundUser })
})
*/

// get all users or Retrieve a list of users
router.get('/', (req, res) => {
    return res.status(200).json({ users: usersData })
})


// create user
let newId = usersData.length + 1;

router.post('/', (req, res) => {

    const { email } = req.body

    if (!email) {
        return res.status(400).json({ error: 'please provide an email' })
    }

    const emailExist = usersData.some((user) => user.email === email)

    if (emailExist) {
        res.status(409).json({ error: 'Email already exist , provide another email' })
    }


    const newUser = {
        email: email,
        id: ++newId
    }

    usersData.push(newUser)

    res.status(201).json({ users: newUser });

})

// Get user by Id

router.get('/:id', (req , res) => {

    const usersId = Number(req.params.id)
    const findUser = usersData.find((user) => user.id === usersId)

    res.status(200).json({users : findUser})

})

// delete user by id

router.delete('/:id', (req , res) => {

    let id = Number(req.params.id)
    const foundDelId = usersData.find((user) => user.id === id)
    const userIndex = usersData.indexOf(foundDelId)
    usersData.splice(userIndex,1)

    res.status(201).json({users : foundDelId})
})

// update user


router.put('/:id', (req, res) => {
    const { email } = req.body;
    const updateId = Number(req.params.id);

    const findUser = usersData.find((user) => user.id === updateId);

    if (!findUser) {
        return res.status(404).json({ error: "User not found" });
    }

    // Update the user's email
    findUser.email = email;

    res.status(200).json({ user: findUser });
});



module.exports = router