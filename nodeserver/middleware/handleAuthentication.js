const passport = require('passport');
require('dotenv').config();

exports.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  return res.status(400).send('User is not logged in');
};

exports.isNotLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return res.status(400).send('User already logged in');
  }

  next();
};

exports.hasReadWritreAccess = (req, res, next) => {
  const user = req.user;

  if(!user) {
    return res.status(400).send('Must be logged in to do that');
  }

  if(user.permissionLevel < process.env.READ_WRITE_PERMISSION) {
    return res.status(400).send('Permission denied')
  }

  next();

};

exports.sameUser = (req, res, next) => {
  if(req.user._id === req.params.userId) {
    next();
  }
  
  return res.status(400).send('No permission to do that');
};