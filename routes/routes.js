'use strict'

var express = require('express');
var api = express.Router();
var mdAuth = require('../middlewares/authenticated'); 
var connectMultiparty = require('connect-multiparty');
var userController = require('../controllers/user.controller');

api.post('/saveUser', userController.createUser);  

module.exports = api;   