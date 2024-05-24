const express = require('express');
const router = express.Router();
const ImageProductController = require('../../controllers/imageProductCotroller');
const Upload = require('../../config/upload');

router.post('/', Upload.array('image', 5), ImageProductController.createImageProduct);
router.get('/:id_product', ImageProductController.getIdImageProduct);
router.get('/image/:id/:index', ImageProductController.getImageProduct);
router.put('/', Upload.array('image', 5), ImageProductController.updateImageProduct);
router.delete('/:id_product', ImageProductController.deleteImages);
module.exports = router;