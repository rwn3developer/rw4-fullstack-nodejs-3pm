const passport = require('passport');


const passportLocal = require('passport-local').Strategy;

passport.use(new passportLocal({
    usernameField: 'email',
}, async (email, password, done) => {
    console.log(email);
    console.log(password);

}))


module.exports = passport