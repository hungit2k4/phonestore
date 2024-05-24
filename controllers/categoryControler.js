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
exports.getCategoryPagination = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Trang hiện tại, mặc định là trang 1
        const limit = parseInt(req.query.limit) || 10; // Số lượng phần tử trên mỗi trang, mặc định là 10
        const skipIndex = (page - 1) * limit; // Vị trí bắt đầu của trang hiện tại trong cơ sở dữ liệu

        const category = await Category.find()
            .skip(skipIndex)
            .limit(limit);
        if (category) {
            return res.status(200).json(category);
        }
        res.status(400).json([]);
    } catch (error) {
        console.log(error);
    }

}
exports.searchCategory = async (req, res) => {
    try {
        // Tìm kiếm sản phẩm theo tên
        const value = req.query.value;
        const category = await Category.find({ nameCategory: { $regex: value, $options: 'i' } });

        // Kiểm tra nếu không tìm thấy sản phẩm
        if (!category) {
            return res.status(404).json([]);
        }

        // Trả về danh sách sản phẩm tìm thấy
        res.status(200).json(category);
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi tìm kiếm sản phẩm.' });
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

