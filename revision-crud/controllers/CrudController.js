const UserModel = require('../models/UserModel');
const formPage = (req, res) => {
    return res.render('form')
}

const tablePage = async (req, res) => {
    try {
        let users = await UserModel.find({});
        return res.render('table', {
            users: users
        })
    } catch (err) {
        console.log(err);
        return false;
    }
}
const insertData = async (req, res) => {
    try {
        const { editid, name, email, password } = req.body;
        if (editid) {
            await UserModel.findByIdAndUpdate(editid, {
                name: name,
                email: email,
                password: password
            });
            console.log(`user edit`);
            return res.redirect('/');
        } else {
            const user = await UserModel.create({
                name: name,
                email: email,
                password: password
            });
            console.log(`user create`);
            return res.redirect('/');
        }


    } catch (err) {
        console.log(err);
        return false;
    }
}
const deleteUser = async (req, res) => {
    try {
        let id = req?.query?.id;
        await UserModel.findByIdAndDelete(id);
        console.log(`user delete`);
        return res.redirect('/');
    } catch (err) {
        console.log(err);
        return false
    }
}
const editUser = async (req, res) => {
    try {
        let id = req?.query?.id;
        let single = await UserModel.findById(id);
        return res.render('edit', {
            single
        });

    } catch (err) {
        console.log(err);
        return false
    }
}
module.exports = {
    formPage, tablePage, insertData, deleteUser, editUser
}