let CategoryModel = require('../models/CategoryModel');
let SubCategoryModel = require('../models/SubcategoryModel');


const viewexsubCategory = async (req, res) => {
    try {
        return res.render('exsubcategory/view_exsubcategory')
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
module.exports = {
    viewexsubCategory, addexSubCategory
}