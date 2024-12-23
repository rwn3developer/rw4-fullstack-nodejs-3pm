const User = require('../models/UserModel');

const loginPage = (req, res) => {
    if (req.cookies.auth) {
        return res.redirect('/dashboard');
    }
    return res.render('login')
}
const registerPage = (req, res) => {
    return res.render('register')
}
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.create({
            name: name,
            email: email,
            password: password
        })
        console.log("user create");

        return res.redirect('/');
    } catch (err) {
        console.log(err);
        return false;
    }
}
const dashboardPage = (req, res) => {
    if (!req.cookies['auth']) {
        return res.redirect('/')
    }
    return res.render('dashboard')
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email: email, password: password });
        if (!user) {
            console.log(`Email and Password are invalid`);
            return res.redirect('/')
        }
        res.cookie('auth', user);
        return res.redirect('/dashboard')
    } catch (err) {
        console.log(err);
        return false;
    }
}
const logout = (req, res) => {
    res.clearCookie('auth');
    return res.redirect('/')
}
module.exports = {
    loginPage, registerPage, registerUser, dashboardPage, loginUser, logout
}