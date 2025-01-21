const express = require('express');

const routes = express.Router();

const { viewCategory, addCategory, insertCategory, deleteCategory } = require('../controllers/CategoryController');



routes.get('/', viewCategory)
routes.get('/addcategory', addCategory)
routes.post('/insertcategory', insertCategory);
routes.get('/deletecategory', deleteCategory)

module.exports = routes;