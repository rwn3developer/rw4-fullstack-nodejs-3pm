const express = require('express');

const routes = express.Router();

const { viewexsubCategory, addexSubCategory, ajaxCategorywiseRecord, insertExsubcategory, deleteExSubcategory, changeStatus } = require('../controllers/ExsubcategoryController');


routes.get('/', viewexsubCategory)
routes.get('/addexsubCategory', addexSubCategory);
routes.get('/ajaxcategorywiserecord', ajaxCategorywiseRecord)
routes.post('/insertexsubcategory', insertExsubcategory)
routes.get('/deleteexsubcategory', deleteExSubcategory)
routes.get('/changestatus', changeStatus)

module.exports = routes;