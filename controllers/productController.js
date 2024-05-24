const Product = require('../models/productModel');
exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        if (product) {
            return res.status(200).json(product._id);
        }
        res.status(400).json({ message: "Create product failed" });
    } catch (error) {
        console.log(error);
    }

}
exports.getAllProduct = async (req, res) => {
    try {
        const products = await Product.find();
        if (products) {
            return res.status(200).json(products);
        }
        res.status(400).json([]);
    } catch (error) {
        console.log(error);
    }

}
exports.getProductPagination = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Trang hiện tại, mặc định là trang 1
        const limit = parseInt(req.query.limit) || 10; // Số lượng phần tử trên mỗi trang, mặc định là 10
        const skipIndex = (page - 1) * limit; // Vị trí bắt đầu của trang hiện tại trong cơ sở dữ liệu

        const products = await Product.find()
            .skip(skipIndex)
            .limit(limit);
        if (products) {
            return res.status(200).json(products);
        }
        res.status(400).json([]);
    } catch (error) {
        console.log(error);
    }

}
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            return res.status(200).json({ data: product });
        }
        res.status(400).json({ message: `Product with id = ${req.params.id} not found` });
    } catch (error) {
        console.log(error);
    }

}
exports.getProductByIdCategory = async (req, res) => {
    try {
        const products = await Product.find({ id_category: req.params.id_category });

        if (products.length > 0) {
            return res.status(200).json(products);
        }
        res.status(400).json({ message: `Product with id_category = ${req.params.id_category} not found` });
    } catch (error) {
        console.log(error);
    }

}
exports.searchProduct = async (req, res) => {
    try {
        // Tìm kiếm sản phẩm theo tên
        const value = req.query.value;
        const products = await Product.find({ name: { $regex: value, $options: 'i' } });

        // Kiểm tra nếu không tìm thấy sản phẩm
        if (!products) {
            return res.status(404).json([]);
        }

        // Trả về danh sách sản phẩm tìm thấy
        res.status(200).json(products);
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi tìm kiếm sản phẩm.' });
    }
}
exports.topProductNew = async (req, res) => {
    try {
        // Sử dụng phương thức find của model Product để lấy ra 10 sản phẩm mới nhất
        const topNewProducts = await Product.find({},{name:1,quantity:1}).sort({ createdAt: -1 }).limit(10);
        res.status(200).json(topNewProducts);
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi tìm kiếm sản phẩm.' });
    }
};
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.body.id, req.body, { new: true });
        if (product) {
            return res.status(200).json(product);
        }
        res.status(400).json({ message: `Update product failed` });
    } catch (error) {
        console.log(error);
    }

}
exports.deleteProduct = async (req, res) => {
    try {

        const product = await Product.findByIdAndDelete(req.params.id);
        if (product) {

            return res.status(200).json({
                message: "Product deleted successfully"
            });
        }
        res.status(400).json({ message: `Delete product failed` });
    } catch (error) {
        console.log(error);
    }

}