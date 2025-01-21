const Category = require('../models/CategoryModel');

const viewCategory = async (req, res) => {
    try {
        let categories = await Category.find({});
        return res.render('category/view_category', {
            categories
        });
    } catch (err) {
        console.log(err);
        return false;
    }
}
const addCategory = async (req, res) => {
    try {
        return res.render('category/add_category');
    } catch (err) {
        console.log(err);
        return false;
    }
}
const insertCategory = async (req, res) => {
    try {
        const { category } = req.body

        let cat = await Category.create({
            category: category
        })
        console.log("category successfully add");
        req.flash('success', "category successfully insert");
        return res.redirect('/category/addcategory')

    } catch (err) {
        console.log(err);
        return false;
    }
}
const deleteCategory = async (req, res) => {
    try {
        let id = req.query.id;
        await Category.findByIdAndDelete(id);
        req.flash('delete', "category successfully delete");
        return res.redirect('/category');
    } catch (err) {
        console.log(err);
        return false;
    }
}
module.exports = {
    viewCategory, addCategory, insertCategory, deleteCategory
}