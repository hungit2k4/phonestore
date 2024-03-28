// userRoutes.js

const express = require('express');
const userController = require('../../controllers/userController');

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getListUser);
router.get('/:id', userController.getUserById);
router.put('/', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/login', userController.login);
//jekc vjzs vomu hlmq
module.exports = router;
