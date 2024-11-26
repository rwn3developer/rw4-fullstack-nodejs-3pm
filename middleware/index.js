const express = require('express');

const port = 8000;

const app = express();

app.set('view engine', 'ejs');

const ageCheck = (req, res, next) => {
    const age = req.query.age;
    if (age >= 18) {
        return next();
    }
    return res.redirect('/')
}
app.get('/', (req, res) => {
    return res.render('index');
})
app.get('/product', ageCheck, (req, res) => {
    return res.render('product');
})
app.get('/con', ageCheck, (req, res) => {
    return res.render('contact');
})
app.use(ageCheck)//call the middleware
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false
    }
    console.log(`server start on port :- ${port}`);

})