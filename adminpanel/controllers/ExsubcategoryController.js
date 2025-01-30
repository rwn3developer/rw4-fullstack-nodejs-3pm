let CategoryModel = require('../models/CategoryModel');
let SubCategoryModel = require('../models/SubcategoryModel');
let ExSubCategoryModel = require('../models/ExsubcategoryModel');

const viewexsubCategory = async (req, res) => {
    try {
        let exsubcategory = await ExSubCategoryModel.find({}).populate('categoryId').populate('subcategoryId')
        return res.render('exsubcategory/view_exsubcategory', {
            exsubcategory
        })
    } catch (err) {
        console.log(err);
        return false;
    }
}
const addexSubCategory = async (req, res) => {
    try {
        let category = await CategoryModel.find({ status: 'active' });
        let subcategory = await SubCategoryModel.find({ status: 'active' });

        return res.render('exsubcategory/add_exsubcategory', {
            category: category,
            subcategory: subcategory
        })
    } catch (err) {
        console.log(err);
        return false;
    }
}
const ajaxCategorywiseRecord = async (req, res) => {
    try {
        let categoryid = req.query.categoryId;
        console.log(categoryid);

        let subcategorydata = await SubCategoryModel.find({ categoryId: categoryid, status: 'active' }).populate('categoryId');
        return res.status(200).send({
            success: true,
            message: "record successfully fetch",
            subcategory: subcategorydata
        })
    } catch (err) {
        console.log(err);
        return false;
    }
}
const insertExsubcategory = async (req, res) => {
    try {
        const { category, subcategory, exsubcategory } = req.body;
        await ExSubCategoryModel.create({
            categoryId: category,
            subcategoryId: subcategory,
            exsubcategory: exsubcategory
        })
        req.flash('success', "Exsubcategory successfully add");
        return res.redirect('/exsubcategory/addexsubcategory')
    } catch (err) {
        console.log(err);
        return false;
    }
}
const deleteExSubcategory = async (req, res) => {
    try {
        let id = req.query.id;
        await ExSubCategoryModel.findByIdAndDelete(id);
        req.flash("success", "Exsubcategory successfully delete");
        return res.redirect('/exsubcategory');
    } catch (err) {
        console.log(err);
        return false
    }
}
const editExsubcategory = async (req, res) => {
    try {
        let id = req.query.id;
        let categories = await CategoryModel.find({ status: 'active' });
        let single = await ExSubCategoryModel.findById(id).populate('categoryId').populate('subcategoryId');
        return res.render('exsubcategory/edit_exsubcategory', {
            category: categories,
            single: single,
        });
    } catch (err) {
        console.log(err);
        return false
    }
}
const changeStatus = async (req, res) => {
    try {
        const { id, status } = req.query;
        if (status === "active") {
            await ExSubCategoryModel.findByIdAndUpdate(id, { status: 'active' })
        } else {
            await ExSubCategoryModel.findByIdAndUpdate(id, { status: 'deactive' })
        }
        req.flash("success", "subcategory successfully changed!");
        return res.redirect('/exsubcategory');
    } catch (err) {
        console.log(err);
        return false
    }
}
module.exports = {
    viewexsubCategory, addexSubCategory, ajaxCategorywiseRecord, insertExsubcategory, deleteExSubcategory, changeStatus, editExsubcategory,
}