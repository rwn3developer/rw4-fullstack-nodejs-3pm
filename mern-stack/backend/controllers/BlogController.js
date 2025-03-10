const clouldinari = require('cloudinary').v2;

const BlogModel = require('../models/BlogModel');

const createBlog = async (req, res) => {
    try {
        const { userid, title, content } = req.body;
        console.log(req.file);

        if (!title || !content || !req.file) {
            return res.status(400).send({
                success: false,
                message: "Please fill in all fields"
            });
        }
        let imageUrl = await clouldinari.uploader.upload(req.file.path);
        let blog = await BlogModel.create({
            userId: userid,
            title: title,
            content: content,
            blogimage: imageUrl?.secure_url,
            public_id: imageUrl?.public_id,
        })
        return res.status(201).send({
            success: true,
            message: "Blog created successfully",
            blog: blog
        });
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}
const userViewBlog = async (req, res) => {
    try {
        let userid = req.user?._id;
        let blogs = await BlogModel.find({ userId: userid });
        return res.status(200).send({
            success: true,
            totalblog: blogs.length,
            message: "Blog fetched successfully",
            blogs: blogs
        });
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}
const userDeleteBlog = async (req, res) => {
    try {
        let blogid = req.query.blogid;
        let oldimage = await BlogModel.findById(blogid);
        await clouldinari.uploader.destroy(oldimage?.public_id);
        await BlogModel.findByIdAndDelete(blogid);
        return res.status(200).send({
            success: true,
            message: "Blog successfully delete",
        });
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}
const userUpdateBlog = async (req, res) => {
    try {
        const { blogid, title, content } = req.body;
        if (req.file) {
            let oldimage = await BlogModel.findById(blogid)
            await clouldinari.uploader.destroy(oldimage?.public_id)
            let newimage = await clouldinari.uploader.upload(req.file.path);
            let blog = await BlogModel.findByIdAndUpdate(blogid, {
                title: title,
                content: content,
                image: newimage.secure_url,
                public_id: newimage?.public_id
            })
            return res.status(200).send({
                success: true,
                message: "Blog updated successfully",
                blog
            });
        } else {
            let oldimage = await BlogModel.findById(blogid)
            let blog = await BlogModel.findByIdAndUpdate(blogid, {
                title: title,
                content: content,
                image: oldimage?.image,
                public_id: oldimage?.public_id
            })
            return res.status(200).send({
                success: true,
                message: "Blog updated successfully",
                blog
            });
        }
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }
}
module.exports = {
    createBlog, userViewBlog, userDeleteBlog, userUpdateBlog
}