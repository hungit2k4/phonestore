const express = require('express');
const router = express.Router();
const CartController = require('../../controllers/cartController');

router.post('/', CartController.createCart);
router.get('/:id_user', CartController.getByIdUser);
router.put('/', CartController.updateCart);
router.delete('/deleteone/:id', CartController.deleteOneCart);
router.delete('/deleteall/:id_user', CartController.deleteAllCartWithIdUser);
module.exports = router;