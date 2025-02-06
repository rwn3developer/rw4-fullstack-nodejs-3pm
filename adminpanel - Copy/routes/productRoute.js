const express = require('express');

const routes = express.Router();

const { viewPage, addPage, ajaxSubcategorywiseRecord } = require('../controllers/ProductController');


routes.get('/', viewPage)
routes.get('/addproduct', addPage)
routes.get('/ajaxsubcategorywiserecord', ajaxSubcategorywiseRecord)


module.exports = routes;