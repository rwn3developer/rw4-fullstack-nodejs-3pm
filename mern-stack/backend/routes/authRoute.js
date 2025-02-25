const express = require('express');

const routes = express.Router();

const { loginUser, registerUser, dummyApi, allUser } = require('../controllers/AuthController');
const { verifyToken, authorizeRole } = require('../middleware/Auth');

const multer = require('multer');

const cloudinary = require('cloudinary').v2;

const storage = multer.diskStorage({});

const userImage = multer({ storage: storage }).single('userimage')


routes.post('/login', loginUser)
routes.post('/register', userImage, registerUser)
routes.get('/dummyapi', verifyToken, dummyApi)
routes.get('/adminalluser', verifyToken, authorizeRole(['admin']), allUser)


module.exports = routes;