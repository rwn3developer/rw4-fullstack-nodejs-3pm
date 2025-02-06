const Category = require('../models/CategoryModel');
const Subcategory = require('../models/SubcategoryModel');
const ExSubcategory = require('../models/ExsubcategoryModel');



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
        await Subcategory.deleteMany({ categoryId: id });
        await ExSubcategory.deleteMany({ categoryId: id });
        req.flash('delete', "category successfully delete");
        return res.redirect('/category');
    } catch (err) {
        console.log(err);
        return false;
    }
}
const editCategory = async (req, res) => {
    try {
        let id = req.query.id;
        let singlecategory = await Category.findById(id);
        return res.render('category/edit_category', {
            single: singlecategory
        });
    } catch (err) {
        console.log(err);
        return false;
    }
}
const updateCategory = async (req, res) => {
    try {
        const { editid, category } = req.body;
        let upcategory = await Category.findByIdAndUpdate(editid, {
            category: category
        })
        req.flash('success', "Category Successfully Update");
        return res.redirect('/category');
    } catch (err) {
        console.log(err);
        return false;
    }
}
const changeStatus = async (req, res) => {
    try {
        let id = req.query.id;
        let status = req.query.status;
        if (status === "deactive") {
            await Category.findByIdAndUpdate(id, {
                status: 'deactive'
            })
        } else {
            await Category.findByIdAndUpdate(id, {
                status: 'active'
            })
        }
        req.flash('success', "Category Successfully Changed");
        return res.redirect('/category');

    } catch (err) {
        console.log(err);
        return false;
    }
}
module.exports = {
    viewCategory, addCategory, insertCategory, deleteCategory, editCategory, updateCategory, changeStatus
}