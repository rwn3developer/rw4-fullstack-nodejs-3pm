const Comment = require('../models/CommentModel');
const addComment = async (req, res) => {
    try {
        const { blogid, comment } = req.body;
        let userid = req.user?._id;
        let usercomment = await Comment.create({
            userId: userid,
            blogId: blogid,
            comment: comment
        })
        return res.status(200).send({
            success: true,
            message: "Comment successfully add",
            comment: usercomment
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            error: err
        })
    }
}
const adminViewComment = async (req, res) => {
    try {
        let comments = await Comment.find({}).populate('userId').populate('blogId')
        return res.status(200).send({
            success: true,
            message: "comment successfully fetch",
            comments
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            error: err
        })
    }
}
module.exports = {
    addComment, adminViewComment
}