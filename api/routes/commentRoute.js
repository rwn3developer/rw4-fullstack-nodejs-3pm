const express = require('express');

const routes = express.Router();

const { verifyToken, checkAdmin } = require('../middleware/Auth');

const { addComment, adminViewComment } = require('../controllers/CommentController');

routes.post('/addcomment', verifyToken, addComment)
routes.get('/adminviewcomment', verifyToken, checkAdmin, adminViewComment)

module.exports = routes;