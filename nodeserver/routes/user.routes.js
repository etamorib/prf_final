const express = require('express');
const UserController = require('../contorllers/user.controller');
const AuthenticationHandler = require('../middleware/handleAuthentication');

exports.userRoutesConfig = (app) => {
  app.post('/register', [
    UserController.insert
  ]);

  app.get('/users', [
    AuthenticationHandler.hasReadWritreAccess,
    UserController.listAll
  ]);

  app.get('/user/:userId', [
    UserController.getById
  ]);

  app.delete('/user/:userId', [
    AuthenticationHandler.hasReadWritreAccess,
    UserController.removeById
  ]);

  app.put('/user/:userId', [
    AuthenticationHandler.hasReadWritreAccess,
    AuthenticationHandler.sameUser,
    UserController.patchById
  ]);
};