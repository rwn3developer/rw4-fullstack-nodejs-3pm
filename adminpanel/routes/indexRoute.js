const express = require('express');

const routes = express.Router();




routes.use('/', require('./authRoute'));
routes.use('/category', require('./categoryRoute'));


module.exports = routes;