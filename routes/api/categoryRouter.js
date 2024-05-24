const express = require('express');
const CategoryController = require('../../controllers/categoryControler');
const router = express.Router();

router.post('/', CategoryController.createCategory);
router.get('/', CategoryController.getCategories);
router.get('/search', CategoryController.searchCategory);
router.get('/pagination', CategoryController.getCategoryPagination);
router.get('/:id', CategoryController.getCategorybyid);
router.put('/', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;