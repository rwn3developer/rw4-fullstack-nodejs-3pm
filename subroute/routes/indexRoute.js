const express = require('express');

const routes = express.Router();

const { indexPage } = require('../controlleres/IndexController');



routes.get('/', indexPage)

routes.use('/product', require('./productRoute'));
routes.use('/contact', require('./contactRoute'));


module.exports = routes