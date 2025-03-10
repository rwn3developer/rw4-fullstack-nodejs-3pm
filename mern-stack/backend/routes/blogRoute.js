const express = require('express');

const routes = express.Router();
const { verifyToken } = require('../middleware/Auth');

const { createBlog, userViewBlog, userDeleteBlog, userUpdateBlog } = require('../controllers/BlogController');

const multer = require('multer');

const storage = multer.diskStorage({});

const blogImage = multer({ storage: storage }).single('blogimage');

routes.post('/createblog', verifyToken, blogImage, createBlog);
routes.get('/userviewblog', verifyToken, userViewBlog)
routes.delete('/userdeleteblog', verifyToken, userDeleteBlog)
routes.put('/userupdateblog', verifyToken, blogImage, userUpdateBlog)

module.exports = routes;