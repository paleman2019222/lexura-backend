'use strict'

var express = require('express');
var api = express.Router();
var mdAuth = require('../middlewares/authenticated'); 
var connectMultiparty = require('connect-multiparty');
var userController = require('../controllers/user.controller');

api.post('/saveUser', userController.createUser);  
api.post('/login', userController.login);

module.exports = api;   