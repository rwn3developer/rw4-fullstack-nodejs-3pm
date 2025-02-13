const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await UserModel.findOne({ email: email });

        if (!user || user.password != password) {
            return res.status(401).send({
                success: false,
                message: "Invalid Email and Password"
            })
        }
        let token = await jwt.sign({ payload: user }, 'rnw4', { expiresIn: '3hr' })
        return res.status(200).send({
            success: true,
            message: "Login Success",
            token: token
        })
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password, city, gender, phone } = req.body;
        if (!name || !email || !password || !city || !gender || !phone) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            })
        }
        const dup = await UserModel.findOne({ email: email });
        if (dup) {
            return res.status(400).json({
                success: false,
                message: "User is already exists"
            })
        }
        const user = await UserModel.create({
            name: name,
            email: email,
            password: password,
            city: city,
            gender: gender,
            phone: phone
        })
        return res.status(200).send({
            success: true,
            message: "User created successfully",
            user
        })

    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}
const viewUser = async (req, res) => {
    try {
        let users = await UserModel.find({});
        return res.status(200).send({
            success: true,
            message: "Users found successfully",
            users
        })
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}
const deleteUser = async (req, res) => {
    try {
        let id = req.query.id;
        await UserModel.findByIdAndDelete(id);
        return res.status(200).send({
            success: true,
            message: "Users successfully delete",
        })
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}
const updateUser = async (req, res) => {
    try {
        let id = req.query.id;
        await UserModel.findByIdAndUpdate(id, {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            city: req.body.city,
            gender: req.body.gender,
            phone: req.body.phone
        })
        return res.status(200).send({
            success: true,
            message: "User updated successfully",
        })
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}
module.exports = {
    loginUser, registerUser, viewUser, deleteUser, updateUser
}