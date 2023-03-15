const { users } = require("../../data");

let id = users.length;

const getAll = (req, res) => {
  res.status(200).json({ users });
};

const getByID = (res, req) => {
  //   const id = Number(req.params.id);
  const user = users.find((user) => user.id === Number(req.params.id));
  console.log("---------user----------");
  res.status(200).json({ user });
};

const createUser = (req, res) => {
  id++;
  const user = { ...req.body, id };
  users.push(user);

  res.status(201).json({ user });
};

const deleteUser = (res, req) => {
  const id = Number(req.params.id);
  const index = users.findIndex((person) => person.id === id);
  const user = users.splice(index, 1)[0];
  console.log("users length after delete should be 2:", user);
  res.status(201).json({ user });
};

const updateUserDetails = (res, req) => {
  const foundUser = users.find((user) => user.id === Number(req.params.id));

  const user = { ...foundUser, ...req.body };
  console.log("user:", user);
  users[users.indexOf(foundUser)] = user;

  // if missing fields: res(400)({"missing fields in req body"})
  // if doesn't exist: res(404)({"user doesn't exist"})
  // if already exists: res(409)({"user already exists"})
  res.status(201).json({ user });
};

module.exports = {
  getAll,
  getByID,
  createUser,
  deleteUser,
  updateUserDetails,
};
