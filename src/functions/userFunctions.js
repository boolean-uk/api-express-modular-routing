const getEmail = (req) => {
    return  req.body.email
}

const formatUser = (email, currentUserId, data) => {
    const newUser = {
        "user": {
            id: ++currentUserId,
            email: email
        }
    }
    data.push(newUser)
    return newUser
}

module.exports = { getEmail, formatUser }