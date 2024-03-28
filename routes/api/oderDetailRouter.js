const express = require('express');
const router = express.Router();
const OderDetailController = require('../../controllers/oderDetailController');

router.post('/',OderDetailController.createOderDetail);
router.get('/:id_oder',OderDetailController.getOderDetailByIdOder);

module.exports = router;
