const express = require('express');

const routes = express.Router();

routes.use('/', require('./authRoute'));
routes.use('/blog', require('./blogRoute'));
routes.use('/comment', require('./commentRoute'))

module.exports = routes;