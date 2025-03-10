const User = require('../models/UserModel');

const cloudinary = require('cloudinary').v2;
const allUser = async (req, res) => {
    try {
        let users = await User.find({});
        return res.status(200).send({
            success: true,
            message: "Users fetched successfully",
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
        let userid = req.query.userid;
        const oldimage = await User.findById(userid);
        if (oldimage.public_id) {
            await cloudinary.uploader.destroy(oldimage.public_id);
        }
        await User.findByIdAndDelete(userid);
        return res.status(200).send({
            success: true,
            message: "Users delete successfully",
        })
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}

const editUser = async (req, res) => {
    try {
        const { userid, name, email, password, gender, city, contact } = req.body;
        if (req.file) {
            //old image remove in cloudinary
            let oldimage = await User.findById(userid)
            await cloudinary.uploader.destroy(oldimage.public_id);
            //new image
            let fileupload = await cloudinary.uploader.upload(req.file.path);

            await User.findByIdAndUpdate(userid, {
                name: name,
                email: email,
                password: password,
                gender: gender,
                city: city,
                contact: contact,
                image: fileupload.secure_url,
                public_id: fileupload.public_id
            })
            return res.send({
                success: true,
                message: 'record successfully update',
            })
        } else {
            //select old record
            let oldimage = await User.findById(userid)
            await User.findByIdAndUpdate(userid, {
                name: name,
                email: email,
                password: password,
                gender: gender,
                city: city,
                contact: contact,
                image: oldimage?.image,
                public_id: oldimage?.public_id
            })
            return res.send({
                success: true,
                message: 'record successfully update',
            })
        }


    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}
module.exports = {
    allUser, deleteUser, editUser
}