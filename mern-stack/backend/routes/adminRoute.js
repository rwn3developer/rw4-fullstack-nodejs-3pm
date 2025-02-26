const express = require('express');

const routes = express.Router();

const { allUser } = require('../controllers/AdminController');


routes.get('/alluser', allUser);


module.exports = routes;