const express = require('express');

const routes = express.Router();

const { loginPage, registerPage, registerUser, dashboardPage } = require('../controllers/AuthController');


routes.get('/', loginPage)
routes.get('/register', registerPage)
routes.post('/registeruser', registerUser)
routes.get('/dashboard', dashboardPage)

module.exports = routes;