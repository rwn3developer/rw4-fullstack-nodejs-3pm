const User = require('../models/UserModel');

var nodemailer = require('nodemailer');

const loginPage = (req, res) => {
    if (res.locals?.users) {
        return res.redirect('/dashboard')
    }
    return res.render('login')
}
const registerPage = (req, res) => {
    return res.render('register')
}
const registerUser = async (req, res) => {
    try {
        const { name, email, password, cpassword } = req.body;
        if (password === cpassword) {
            const user = await User.create({
                name: name,
                email: email,
                password: password
            })
            console.log("user create");
            return res.redirect('/');
        } else {
            console.log(`password and confirm password not match`);
            return res.redirect('/register')
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}
const loginUser = async (req, res) => {
    try {
        return res.redirect('/dashboard')
    } catch (err) {
        console.log(err);
        return false;
    }
}
const dashboardPage = async (req, res) => {
    try {
        return res.render('dashboard')
    } catch (err) {
        console.log(err);
        return false;
    }
}
const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            return false;
        }
        return res.redirect('/')
    })
}

//forgot password
const otpPage = async (req, res) => {
    try {
        return res.render('otp');
    } catch (err) {
        console.log(err);
        return false;
    }
}
const newPasswordPage = async (req, res) => {
    try {
        return res.render('newpassword');
    } catch (err) {
        console.log(err);
        return false;
    }
}
const forgotPassword = async (req, res) => {
    try {
        let useremail = req.body.useremail;

        const user = await User.findOne({ email: useremail });

        if (!user) {
            console.log("User is not found");
            return res.redirect('/');
        }

        const otp = Math.floor(Math.random() * 100000);

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'rwn3developer11@gmail.com',
                pass: 'ygqc qquw jczl yygj'
            }
        });

        var mailOptions = {
            from: 'rwn3developer11@gmail.com',
            to: useremail,
            subject: 'Forgotpassword',
            html: `<h2 style='color:green'>Hello ${user?.name} Your Otp :- ${otp}</h2>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                let auth = {
                    email: useremail,
                    otp: otp
                }
                res.cookie('user', auth);
                return res.redirect('/otp');
            }
        });


    } catch (err) {
        console.log(err);
        return false;
    }
}
const userOtp = async (req, res) => {
    try {
        let otp = req.body.otp;
        if (req.cookies.user?.otp == otp) {
            return res.redirect('/newpassword')
        } else {
            console.log("Otp is not match");
            return res.redirect('/otp');
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}
const usernewPassword = async (req, res) => {
    try {
        let newpass = req.body.newpass;
        let cpass = req.body.cpass;
        if (newpass == cpass) {
            let email = req.cookies?.user?.email;
            let user = await User.findOneAndUpdate({ email: email }, {
                password: newpass
            })
            res.clearCookie('user');
            return res.redirect('/');
        } else {
            console.log(`newpassword and confirm password is not match`);
            return res.redirect('/newpassword')
        }

    } catch (err) {
        console.log(err);
        return false;
    }
}
module.exports = {
    loginPage, registerPage, registerUser, loginUser, dashboardPage, logout, otpPage, newPasswordPage, forgotPassword, userOtp, usernewPassword
}