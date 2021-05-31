const express = require('express');
const router = express.Router();
const ProductrController = require('../contorllers/product.controller');
const AuthenticationHandler = require('../middleware/handleAuthentication');

exports.productRoutesConfig = (app) => {
  app.get('/products', [
    ProductrController.listAll
  ]);

  app.get('/products/:category', [     
    ProductrController.listAllByCategory
  ]);

  app.get('/product/:productId', [ 
    ProductrController.getById
  ])

  app.post('/product', [
    AuthenticationHandler.hasReadWritreAccess,
    ProductrController.insert
  ]);

  app.put('/product/:productId', [
    AuthenticationHandler.hasReadWritreAccess,
    ProductrController.patchById
  ])

  app.delete('/product/:productId', [
    AuthenticationHandler.hasReadWritreAccess,
    ProductrController.removeById
  ])
};