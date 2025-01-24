const express = require('express');

const routes = express.Router();

const { viewexsubCategory, addexSubCategory } = require('../controllers/ExsubcategoryController');


routes.get('/', viewexsubCategory)
routes.get('/addexsubCategory', addexSubCategory);

module.exports = routes;