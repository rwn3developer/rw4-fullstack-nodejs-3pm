const express = require('express');

const routes = express.Router();

const { loginPage, registerPage, registerUser, loginUser, dashboardPage, logout, otpPage, newPasswordPage, forgotPassword, userOtp, usernewPassword } = require('../controllers/AuthController');

const passport = require('passport');

routes.get('/', loginPage)
routes.get('/register', registerPage)
routes.post('/registeruser', registerUser)
routes.post('/loginuser', passport.authenticate('local', { failureRedirect: '/' }), loginUser)


routes.get('/dashboard', passport.checkUser, dashboardPage)
routes.get('/logout', logout)


//forgot password
routes.get('/otp', otpPage)
routes.get('/newpassword', newPasswordPage)
routes.post('/forgotpassword', forgotPassword)
routes.post('/userotp', userOtp)
routes.post('/usernewpassword', usernewPassword)


module.exports = routes;