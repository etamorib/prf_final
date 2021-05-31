const express = require('express');
const AuthController = require('./authorization.controller');
const AuthenticationHandler = require('../middleware/handleAuthentication');

exports.authRoutesConfig = (app) => {
  app.post('/login', [
    AuthenticationHandler.isNotLoggedIn,
    AuthController.login
  ]);

  app.get('/logout', [
    AuthenticationHandler.isLoggedIn,
    AuthController.logout
  ]);
};