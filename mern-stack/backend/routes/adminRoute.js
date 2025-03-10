const express = require('express');

const routes = express.Router();

const { allUser, deleteUser, editUser } = require('../controllers/AdminController');

const multer = require('multer');

const cloudinary = require('cloudinary').v2;

const storage = multer.diskStorage({});

const userImage = multer({ storage: storage }).single('userimage')


routes.get('/alluser', allUser);
routes.delete('/deleteuser', deleteUser)
routes.put('/edituser', userImage, editUser);


module.exports = routes;