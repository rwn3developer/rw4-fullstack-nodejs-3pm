const express = require('express');

const routes = express.Router();

const { loginPage, registerPage, registerUser, dashboardPage, loginUser, logout } = require('../controllers/AuthController');


routes.get('/', loginPage)
routes.get('/register', registerPage)
routes.post('/registeruser', registerUser)
routes.get('/dashboard', dashboardPage)
routes.post('/loginuser', loginUser);
routes.get('/logout', logout);

module.exports = routes;