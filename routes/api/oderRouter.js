const express = require('express');
const router = express.Router();
const OderController = require('../../controllers/oderController');

router.post('/', OderController.create);
router.get('/', OderController.getAllOder);
router.get('/:id', OderController.getOderbyId);
router.get('/user/:id_user', OderController.getOderbyIdUser);
router.put('/', OderController.updateOder);

module.exports = router;