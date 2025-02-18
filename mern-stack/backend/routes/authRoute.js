const express = require('express');

const routes = express.Router();

const { loginUser, registerUser, dummyApi, allUser } = require('../controllers/AuthController');
const { verifyToken, authorizeRole } = require('../middleware/Auth');

routes.post('/login', loginUser)
routes.post('/register', registerUser)
routes.get('/dummyapi', verifyToken, dummyApi)
routes.get('/adminalluser', verifyToken, authorizeRole, allUser)


module.exports = routes;