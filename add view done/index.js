const express = require('express');

const port = 8000;

const app = express();

const db = require('./config/db');

app.set('view engine', 'ejs');

const UserModel = require('./models/UserModel')

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

app.post('/insertrecord', (req, res) => {
    const { name, email, password } = req.body;
    UserModel.create({
        username: name,
        useremail: email,
        userpassword: password
    }).then((data) => {
        console.log("record successfully add");
        return res.redirect('/add')
    }).catch((err) => {
        console.log(err);
        return false;
    })
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`server is start on port :- ${port}`);
})

