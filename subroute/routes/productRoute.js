const express = require('express');

const routes = express.Router();

const { productPage } = require('../controlleres/ProductController');


routes.get('/', productPage)


module.exports = routes;