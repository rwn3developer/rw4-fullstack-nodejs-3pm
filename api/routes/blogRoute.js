const express = require('express');

const routes = express.Router();

const multer = require('multer');

const { verifyToken, checkAdmin } = require('../middleware/Auth')

const { addBlog, adminViewBlog, userwiseViewBlog, adminDeleteBlog, updateBlog, userwiseDeleteBlog } = require('../controllers/BlogController');

const st = multer.diskStorage({
    destination: (req, res, cb) => {
        return cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        let uniq = Math.floor(Math.random() * 100000000);
        return cb(null, `${file.fieldname}-${uniq}`)
    }
})

const blogImage = multer({ storage: st }).single('image')

routes.post('/addblog', verifyToken, blogImage, addBlog)
routes.get('/adminviewblog', verifyToken, adminViewBlog);
routes.get('/userwiseviewblog', verifyToken, userwiseViewBlog)
routes.delete('/userwisedeleteblog', verifyToken, userwiseDeleteBlog);
routes.get('/admindeleteblog', verifyToken, checkAdmin, adminDeleteBlog)
routes.put('/updateblog', verifyToken, blogImage, updateBlog)

module.exports = routes;