
const CategoryModel = require('../models/CategoryModel');
const SubCategoryModel = require('../models/SubcategoryModel');
const ExSubcategoryModel = require('../models/ExsubcategoryModel');


const viewSubCategory = async (req, res) => {
    try {
        let subcategorydata = await SubCategoryModel.find({}).populate('categoryId');
        return res.render('subcategory/view_subcategory', {
            subcategory: subcategorydata
        })
    } catch (err) {
        console.log(err);
        return false
    }
}

const addSubCategory = async (req, res) => {
    try {
        let category = await CategoryModel.find({ status: 'active' });
        return res.render('subcategory/add_subcategory', {
            category: category
        })
    } catch (err) {
        console.log(err);
        return false
    }
}
const insertSubcategory = async (req, res) => {
    try {
        const { category, subcategory } = req.body;
        let subcat = await SubCategoryModel.create({
            categoryId: category,
            subcategory: subcategory
        })
        req.flash("success", "subcategory successfully create");
        return res.redirect('/subcategory/addsubcategory');
    } catch (err) {
        console.log(err);
        return false
    }
}
const deleteSubcategory = async (req, res) => {
    try {
        let id = req.query.id;
        await SubCategoryModel.findByIdAndDelete(id);
        await ExSubcategoryModel.deleteMany({ subcategoryId: id });
        req.flash("success", "subcategory successfully delete");
        return res.redirect('/subcategory');
    } catch (err) {
        console.log(err);
        return false
    }
}
const editSubcategory = async (req, res) => {
    try {
        let id = req.query.id;
        let singleRow = await SubCategoryModel.findById(id).populate('categoryId');
        let category = await CategoryModel.find({ status: 'active' });
        return res.render('subcategory/edit_subcategory', {
            single: singleRow,
            category: category
        })
    } catch (err) {
        console.log(err);
        return false
    }
}
const updateSubcategory = async (req, res) => {
    try {
        const { editid, category, subcategory } = req.body
        await SubCategoryModel.findByIdAndUpdate(editid, {
            categoryId: category,
            subcategory: subcategory
        })
        req.flash("success", "subcategory successfully update");
        return res.redirect('/subcategory');
    } catch (err) {
        console.log(err);
        return false
    }
}
const changeStatus = async (req, res) => {
    try {
        const { id, status } = req.query;

        if (status === "active") {
            await SubCategoryModel.findByIdAndUpdate(id, { status: 'active' })
        } else {
            await SubCategoryModel.findByIdAndUpdate(id, { status: 'deactive' })
        }
        req.flash("success", "subcategory successfully changed!");
        return res.redirect('/subcategory');
    } catch (err) {
        console.log(err);
        return false
    }
}
module.exports = {
    viewSubCategory, addSubCategory, insertSubcategory, deleteSubcategory, editSubcategory, updateSubcategory, changeStatus
}