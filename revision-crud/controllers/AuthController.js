const User = require('../models/UserModel');

const loginPage = (req, res) => {
    return res.render('login');
}

const registerPage = (req, res) => {
    return res.render('register');
}
const registerUser = async (req, res) => {
    try {
        let user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        console.log("user successfully insert");
        return res.redirect('/');
    } catch (err) {
        console.log(err);
        return false;
    }
}
module.exports = {
    loginPage, registerPage, registerUser
}