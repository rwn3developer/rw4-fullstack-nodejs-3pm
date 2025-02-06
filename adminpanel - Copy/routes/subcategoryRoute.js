const express = require('express');

const routes = express.Router();

const { viewSubCategory, addSubCategory, insertSubcategory, deleteSubcategory, editSubcategory, updateSubcategory, changeStatus } = require('../controllers/SubcategoryController');


routes.get('/', viewSubCategory);
routes.get('/addsubcategory', addSubCategory)
routes.post('/insertsubcategory', insertSubcategory)
routes.get('/deletesubcategory', deleteSubcategory)
routes.get('/editsubcategory', editSubcategory);
routes.post('/updatesubcategory', updateSubcategory)
routes.get('/changestatus', changeStatus)


module.exports = routes;