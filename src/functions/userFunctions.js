const getEmail = (req) => {
    return  req.body.email
}

const createUser = (email, currentUserId, data) => {
    const newUser = {
            id: ++currentUserId,
            email: email
    }
    data.push(newUser)
    return newUser
}

const formatUser = (userToFormat) => {
    const user = {
        "user": userToFormat
    }
    return user
}

const findUser = (req, res, data) => {
    const userId = Number(req.params.id)
    const foundUser = data.find(user => user.id === userId)
    if (!foundUser) {
        return res.status(404).json(`User with ID: ${userId} does not exist`)
    }
    return foundUser
}

const deleteUser = (user, data) => {
    userIndex = data.indexOf(user)
    data.splice(userIndex, 1)
}

module.exports = { getEmail, createUser, formatUser, findUser, deleteUser }