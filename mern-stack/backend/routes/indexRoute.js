const express = require('express');

const routes = express.Router();

const { authorizeRole, verifyToken } = require('../middleware/Auth');


routes.use('/', require('./authRoute'));
routes.use('/admin', verifyToken, authorizeRole(['admin']), require('./adminRoute'));
routes.use('/blog', require('./blogRoute'));

module.exports = routes;   