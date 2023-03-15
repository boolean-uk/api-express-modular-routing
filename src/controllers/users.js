const { users } = require("../../data");

let id = users.length;

const getAll = (req, res) => {
  res.status(200).json({ users });
};

const getByID = (userID) => {
  return users.find((user) => user.id === userID);
};

const createUser = (req, res) => {
  id++;
  const user = { ...req.body, id };
  users.push(user);

  res.status(201).json({ user });
};

const deleteUser = (userID) => {
  const index = users.findIndex((person) => person.id === userID);
  const user = users.splice(index, 1)[0];
  return user;
};

// const updateUserDetails = (userID) => {
//   const foundUser = users.find((user) => user.id === userID);
//   const user = { ...foundUser, ...req.body };
//   users[users.indexOf(foundUser)] = user;
//   return user;
// };

module.exports = {
  getAll,
  getByID,
  createUser,
  deleteUser,
  //   updateUserDetails,
};
