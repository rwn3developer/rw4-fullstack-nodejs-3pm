const express = require('express');

const routes = express.Router();

const { viewCategory, addCategory, insertCategory, deleteCategory, editCategory, updateCategory, changeStatus } = require('../controllers/CategoryController');



routes.get('/', viewCategory)
routes.get('/addcategory', addCategory)
routes.post('/insertcategory', insertCategory);
routes.get('/deletecategory', deleteCategory)
routes.get('/editcategory', editCategory);
routes.post('/updatecategory', updateCategory)
routes.get('/changestatus', changeStatus)

module.exports = routes;