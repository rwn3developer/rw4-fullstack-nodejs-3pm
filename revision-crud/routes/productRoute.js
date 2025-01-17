const express = require('express');

const routes = express.Router();

routes.get('/', tablePage)
routes.get('/add', formPage);
routes.post('/insertdata', insertData)
routes.get('/deleteuser', deleteUser)
routes.get('/edituser', editUser)

module.exports = routes;