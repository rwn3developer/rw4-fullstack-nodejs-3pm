const express = require('express');

const routes = express.Router();

const { indexPage } = require('../controllers/IndexController');
const { contactPage } = require('../controllers/ContactController');
const { productPage } = require('../controllers/ProductController');
const { cartPage } = require('../controllers/CartController');




routes.get('/', indexPage);
routes.get('/contact', contactPage);
routes.get('/product', productPage);
routes.get('/cart', cartPage);



module.exports = routes;