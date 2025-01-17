const express = require('express');
const { loginPage, registerPage, registerUser } = require('../controllers/AuthController');

const routes = express.Router();

routes.get('/', loginPage);
routes.get('/register', registerPage);
routes.post('/registeruser', registerUser);

module.exports = routes;