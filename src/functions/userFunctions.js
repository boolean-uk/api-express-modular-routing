const getEmail = (req, res, data) => {
    const { email } = req.body
    if (!email) return res.status(400).json({"error": "Missing fields in request body"})
    const isEmailExisting = data.find(user => user.email === email)
    if (isEmailExisting) return res.status(409).json({"error":"A user with the provided email already exists"})
    return email
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