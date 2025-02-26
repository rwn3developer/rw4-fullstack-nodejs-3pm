const User = require('../models/UserModel');
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
module.exports = {
    allUser
}