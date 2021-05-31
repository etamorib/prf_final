const UserModel = require('../schemas/users/user.model');

exports.insert = async (req, res) => {
  let result = await UserModel.createUser(req.body);
  console.log('Creating new user');
  res.status(201).send({id: result._id});
};

exports.getById = async (req, res) => {
  const id = req.params.userId;
  let result =  await UserModel.findById(id);
  console.log('User get by id');
  res.status(200).send(result);
};

exports.listAll = async (req, res) => {
  let result = await UserModel.listAll();
  console.log('All users');
  res.status(200).send(result);
};


exports.patchById = async (req, res) => {
  const id = req.params.userId;
  let result = await UserModel.patchUser(id, req.body);
  console.log('User has been updated!');
  res.status(204).send(result);
};

exports.removeById = (req, res) => {
  const id = req.params.userId;
  let result = UserModel.removeById(id);
  console.log('User has been removed!');
  res.status(204).send(result);
};
