const express = require('express');

const port = 8000;

const app = express();

const fs = require('fs');

const db = require('./config/db');

app.set('view engine', 'ejs');

const path = require('path');

app.use("/uploads", express.static(path.join(__dirname, 'uploads')))

const UserModel = require('./models/UserModel')
const multer = require('multer');
const st = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        const uniqname = `${Date.now()}-${Math.random() * 100000}`;
        cb(null, `${file.fieldname}-${uniqname}`)
    }
})


const fileUpload = multer({ storage: st }).single("image");

app.use(express.urlencoded());

app.get('/', (req, res) => {
    UserModel.find({})
        .then((users) => {
            return res.render('view', {
                alldata: users
            });
        }).catch((err) => {
            console.log(err);
            return false
        })

})

app.get('/add', (req, res) => {
    return res.render('add');
})

app.post('/insertrecord', fileUpload, (req, res) => {
    const { name, email, password, gender, hobby, city } = req.body;
    console.log(req.file);

    UserModel.create({
        username: name,
        useremail: email,
        userpassword: password,
        gender: gender,
        hobby: hobby,
        city: city,
        image: req.file.path
    }).then((data) => {
        console.log("record successfully add");
        return res.redirect('/add')
    }).catch((err) => {
        console.log(err);
        return false;
    })
})
app.get(`/deleteuser`, (req, res) => {
    let id = req.query.id;
    UserModel.findById(id)
        .then((single) => {
            fs.unlinkSync(single.image)
        }).catch((err) => {
            console.log(err);
            return false
        })

    UserModel.findByIdAndDelete(id)
        .then((data) => {
            return res.redirect('/')
        }).catch((err) => {
            console.log(err);
            return false;
        })
})

app.get('/edituser', (req, res) => {
    let id = req.query.id;
    UserModel.findById(id)
        .then((single) => {
            return res.render('edit', { single });
        }).catch((err) => {
            console.log(err);
            return false
        })

})

//update record
app.post('/updateRecord', fileUpload, (req, res) => {


    const { editid, name, email, password, gender, hobby, city } = req.body;
    console.log(editid);
    if (req.file) {
        UserModel.findById(editid)
            .then((single) => {
                fs.unlinkSync(single.image)
            }).catch((err) => {
                console.log(err);
                return false;
            });
        UserModel.findByIdAndUpdate(editid, {
            name: name,
            email: email,
            password: password,
            gender: gender,
            hobby: hobby,
            city: city,
            image: req.file.path
        }).then((response) => {
            console.log("Record update");
            return res.redirect('/');
        }).catch((err) => {
            console.log(err);
            return false;
        })
    } else {
        UserModel.findById(editid)
            .then((single) => {
                UserModel.findByIdAndUpdate(editid, {
                    name: name,
                    email: email,
                    password: password,
                    gender: gender,
                    hobby: hobby,
                    city: city,
                    image: single.image
                }).then((response) => {
                    console.log("Record update");
                    return res.redirect('/');
                }).catch((err) => {
                    console.log(err);
                    return false;
                })
            }).catch((err) => {
                console.log(err);
                return false;
            });

    }

    // UserModel.findByIdAndUpdate(editid,{
    //     name : name,
    //     email : email,
    //     password : password
    // }).then((response)=>{
    //     console.log("Record update");
    //     return res.redirect('/');
    // }).catch((err)=>{
    //     console.log(err);
    //     return false;
    // })
})


app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`server is start on port :- ${port}`);
})
