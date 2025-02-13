const express = require('express');

const routes = express.Router();

const { registerUser, viewUser, deleteUser, updateUser, loginUser } = require('../controllers/AuthController');
const { verifyToken, checkAdmin } = require('../middleware/Auth');


routes.post('/login', loginUser)

routes.post('/register', registerUser);
routes.get('/viewuser', verifyToken, viewUser);
routes.delete('/deleteuser', verifyToken, checkAdmin, deleteUser);
routes.put('/updateuser', verifyToken, checkAdmin, updateUser)

module.exports = routes;