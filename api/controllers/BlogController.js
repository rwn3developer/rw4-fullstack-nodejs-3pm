const Blog = require('../models/BlogModel');
const fs = require('fs')
const addBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content || !req.file) {
            return res.status(400).send({
                success: false,
                message: "All fields is required"
            });
        }
        let blog = await Blog.create({
            userId: req.user?._id,
            title: title,
            content: content,
            image: req.file?.path
        })
        return res.status(200).send({
            success: true,
            message: "Blog created successfully",
            blog: blog
        })
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}
const adminViewBlog = async (req, res) => {
    try {
        let blogs = await Blog.find({}).populate('userId');
        return res.status(200).send({
            success: true,
            message: "All blogs",
            length: blogs.length,
            blogs: blogs,
        })
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}
const userwiseViewBlog = async (req, res) => {
    try {
        let userid = req.user?._id;
        let blog = await Blog.find({ userId: userid });
        return res.status(200).send({
            success: true,
            message: "Userwise All blogs",
            blogs: blog
        })
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}
const adminDeleteBlog = async (req, res) => {
    try {
        let id = req.query.id;
        let singleblog = await Blog.findById(id)
        fs.unlinkSync(singleblog?.image)
        await Blog.findByIdAndDelete(id);
        return res.status(200).send({
            success: true,
            message: "Blog is successfully delete"
        })
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}
const updateBlog = async (req, res) => {
    try {
        const { id, title, content } = req.body;
        if (req.file) {
            let singleblog = await Blog.findById(id);
            fs.unlinkSync(singleblog?.image);
            await Blog.findByIdAndUpdate(id, {
                title: title,
                content: content,
                image: req.file?.path
            })
            return res.status(200).send({
                success: true,
                message: "Blog is successfully updated"
            })
        } else {
            let singleblog = await Blog.findById(id);
            await Blog.findByIdAndUpdate(id, {
                title: title,
                content: content,
                image: singleblog?.image
            })
            return res.status(200).send({
                success: true,
                message: "Blog is successfully updated"
            })
        }

    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}
const userwiseDeleteBlog = async (req, res) => {
    try {
        let blogid = req.query?.blogid;
        let singleblog = await Blog.findById(blogid);
        let user = await Blog.find({ userId: singleblog?.userId });
        if (user.length === 0) {
            return res.status(404).send({
                success: false,
                message: "Blog not found"
            })
        }
        fs.unlinkSync(singleblog?.image);
        await Blog.findByIdAndDelete(blogid);
        return res.status(200).send({
            success: true,
            message: "Blog is successfully deleted"
        })
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}
module.exports = {
    addBlog, adminViewBlog, userwiseViewBlog, adminDeleteBlog, updateBlog, userwiseDeleteBlog
}