const Category = require('../models/categoryModel');

exports.createCategory = async (req, res) => {
    try {

        const category = await Category.create(req.body);
        if (category) {
            return res.status(200).json(category);
        }
        res.status(400).json({
            mess: "create category failed"
        });
    } catch (error) {
        console.log(error);
    }
}
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        if (categories) {
            return res.status(200).json(categories);
        }
        res.status(400).json(categories);
    } catch (error) {
        console.log(error);
    }
}
exports.getCategorybyid = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findById(id);
        if (category) {
            return res.status(200).json(category);
        }
        res.status(400).json({
            mess: `category with id = ${id} not found`
        });
    } catch (error) {
        console.log(error);
    }

}
exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findOneAndUpdate({_id:req.body.id},{$set:req.body},{new:true});
        if (category) {
            return res.status(200).json(category);
        }
        res.status(400).json({
            mess: `Update category failed`
        });
    } catch (error) {
        console.log(error)
    }
}
exports.deleteCategory = async (req, res) => {
    try {
        const result = await Category.findByIdAndDelete(req.params.id);
        if (result) {
            return res.status(200).json({
                mess: `Category deleted successfully`
            });
        }
        res.status(400).json({
            mess: `Delete category failed`
        });
    } catch (error) {
        console.log(error)
    }
}

