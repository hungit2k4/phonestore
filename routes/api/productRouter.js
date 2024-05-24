const express = require('express');
const router = express.Router();
const ProductController = require('../../controllers/productController');

router.post('/', ProductController.createProduct);
router.get('/', ProductController.getAllProduct);
router.get('/pagination', ProductController.getProductPagination);
router.get('/new', ProductController.topProductNew);
router.get('/search', ProductController.searchProduct);
router.get('/:id', ProductController.getProductById);
router.get('/idcategory/:id_category', ProductController.getProductByIdCategory);
router.put('/', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;