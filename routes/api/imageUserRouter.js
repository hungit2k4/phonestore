const express = require('express');
const uploadController = require('../../controllers/imageUserController');
const upload = require('../../config/upload');
const router = express.Router();


router.post('/', upload.single('avatar'), uploadController.uploadImage);
router.get('/:id_user', uploadController.getImageUser);
router.delete('/:id', uploadController.delete);
router.put('/', upload.single('avatar'), uploadController.updateImageUser);
module.exports = router;

