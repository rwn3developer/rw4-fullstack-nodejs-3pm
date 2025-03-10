let UserModel = require('../models/UserModel');
let JWT = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await UserModel.findOne({ email: email });
        if (!user || user.password != password) {
            return res.status(401).send({
                success: false,
                message: 'Invalid email or password'
            });
        }
        let token = await JWT.sign({ payload: user }, "blog", { expiresIn: '3hr' })
        return res.status(200).send({
            success: true,
            message: 'Login successful',
            token: token,
            user: user
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
        const { name, email, password, gender, city, contact } = req.body;

        if (!name || !email || !password || !gender || !city || !contact || !req.file) {
            return res.status(400).send({
                success: false,
                message: 'Please fill all the fields'
            });
        }
        let imageRecord = await cloudinary.uploader.upload(req.file.path);
        let user = new UserModel({
            name: name,
            email: email,
            password: password,
            gender: gender,
            city: city,
            contact: contact,
            image: imageRecord?.secure_url,
            public_id: imageRecord?.public_id
        })
        let record = await user.save();
        return res.status(200).send({
            success: true,
            message: "User created successfully",
            record
        })
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}
const dummyApi = (req, res) => {
    res.send(req.user)
}
const allUser = async (req, res) => {
    try {
        let users = await UserModel.find({});
        return res.status(200).send({
            success: true,
            message: "Users found",
            users
        })
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}
const changeProfile = async (req, res) => {
    try {
        // console.log(req.body);
        // console.log(req.file);
        const { userid, name, email, password, gender, city, contact } = req.body;
        if (req.file) {
            let oldimage = await UserModel.findById(userid);
            await cloudinary.uploader.destroy(oldimage.public_id)
            //new image add
            let newimage = await cloudinary.uploader.upload(req.file.path);
            await UserModel.findByIdAndUpdate(userid, {
                name: name,
                email: email,
                password: password,
                gender: gender,
                city: city,
                contact: contact,
                image: newimage?.secure_url,
                public_id: newimage?.public_id
            })
            return res.status(200).send({
                success: true,
                message: "User profile successfully change",
            })
        } else {
            let oldimage = await UserModel.findById(userid);
            await UserModel.findByIdAndUpdate(userid, {
                name: name,
                email: email,
                password: password,
                gender: gender,
                city: city,
                contact: contact,
                image: oldimage?.image,
                public_id: oldimage?.public_id
            })
        }
        return res.status(200).send({
            success: true,
            message: "User profile successfully change",
        })
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}
module.exports = {
    loginUser, registerUser, dummyApi, allUser, changeProfile
}