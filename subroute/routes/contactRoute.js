const express = require('express');

const routes = express.Router();

const { contactPage } = require('../controlleres/ContactController');


routes.get('/', contactPage)


module.exports = routes;