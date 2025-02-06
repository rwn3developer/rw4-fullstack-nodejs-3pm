const express = require('express');

const port = 8000;

const app = express();

app.set('view engine', 'ejs');

const path = require('path');

const db = require('./config/db')

app.use(express.static(path.join(__dirname, 'public')));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

//authentication start passportjs
const passport = require('passport');
const passportLocal = require('./config/passportLocal');
const session = require('express-session');
app.use(session({
    secret: 'rnw4123',
    name: 'mahadev',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser);
//authentication end passportjs

//connect flash middleware start
const flash = require('connect-flash');
app.use(flash());

app.use(function (req, res, next) {
    res.locals.message = req.flash()
    return next();
})
//connect flash middleware end

app.use(express.urlencoded());

app.use('/', require('./routes/indexRoute'));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false
    }
    console.log(`server is start on port :- ${port}`);

})