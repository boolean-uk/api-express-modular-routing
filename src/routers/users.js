const express = require('express')
const router = express.Router()


const data = require('../../data/index.js')
const users = data.users

let lastUsersId = 3

const findUser = (req, res) => {
    const userId = Number(req.params.id);
  
    const foundUser = users.find((user) => user.id === userId);
  
    if (!foundUser) {
      res.status(404).json({ error: `No such post with ID: ${userId} `});
    }
  
    return foundUser;
};


router.get('/', (req, res)=>{
    return res.status(200).json({users})
})

router.post('/', (req, res)=>{

    const body = req.body
    const newUser = { 
        ...body,
       id: ++lastUsersId 
    }

    users.push(newUser)

    res.status(201).json({user: newUser})

})

  router.get('/:id', (req, res)=>{
    const userId = Number(req.params.id)

    const foundUser = findUser(req, res)
    if(foundUser){
        res.status(200).json({user:foundUser})

    }

}) 



router.delete('/:id', (req, res)=>{
    const userId = Number(req.params.id)

    const deleteUser = findUser(req, res)

    const deleteUserIndex = users.indexOf(deleteUser)

    users.splice(deleteUserIndex, 1)

    res.status(200).json({user: deleteUser})

})

router.put('/:id', (req, res)=>{ 

    const userId = Number(req.params.id)
    const editUser = findUser(req, res)
    
    if(editUser){
        const {email} = req.body

        editUser.email = email 
    }
   
    res.status(200).json({user: editUser})

})

module.exports = router




