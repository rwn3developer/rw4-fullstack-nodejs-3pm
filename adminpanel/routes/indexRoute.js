const express = require('express');

const routes = express.Router();

// const passport = require('passport')


routes.use('/', require('./authRoute'));
routes.use('/category', require('./categoryRoute'));
routes.use('/subcategory', require('./subcategoryRoute'));
routes.use('/exsubcategory', require('./exsubcategoryRoute'))
routes.use('/product', require('./productRoute'));


module.exports = routes;