const express = require('express');

const routes = express.Router();

const { TablePage, formPage, insertData, deleteUser, updateUser, updateData } = require('../controllers/CrudController');

const multer = require('multer');

const st = multer.diskStorage({
    destination: (req, res, cb) => {
        return cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const uniq = Math.floor(Math.random() * 1000000000);
        return cb(null, `${file.fieldname}-${uniq}`)
    }
})

const fileUpload = multer({ storage: st }).single('avatar')




routes.get('/', TablePage)
routes.get('/form', formPage)
routes.post('/insertdata', fileUpload, insertData);
routes.get('/deleteuser', deleteUser)
routes.get('/updateuser', updateUser)
routes.post('/updatedata', fileUpload, updateData)


module.exports = routes;