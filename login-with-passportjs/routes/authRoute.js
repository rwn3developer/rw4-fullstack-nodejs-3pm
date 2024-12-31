const express = require('express');

const routes = express.Router();

const { loginPage, registerPage, loginUser, registerUser, dashboardPage } = require('../controllers/AuthController');

const passport = require('passport');

routes.get('/', loginPage)
routes.get('/register', registerPage)
routes.post('/registeruser', registerUser)
routes.post('/loginuser', passport.authenticate('local', { failureRedirect: '/' }), loginUser)
routes.get('/dashboard', dashboardPage)


module.exports = routes;