const User = require('../models/UserModel');

const loginPage = (req, res) => {
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
    return res.render('dashboard')
}
module.exports = {
    loginPage, registerPage, registerUser, dashboardPage
}