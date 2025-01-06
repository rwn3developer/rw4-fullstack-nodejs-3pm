const express = require('express');

const routes = express.Router();

const { tablePage, formPage, insertData, deleteUser, editUser } = require('../controllers/CrudController');


routes.get('/', tablePage)
routes.get('/add', formPage);
routes.post('/insertdata', insertData)
routes.get('/deleteuser', deleteUser)
routes.get('/edituser', editUser)

module.exports = routes