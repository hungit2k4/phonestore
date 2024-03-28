const Cart = require('../models/cartModel');

exports.createCart = async (req, res) => {
    try {
        const cart = await Cart.create(req.body);
        if (cart) {
            return res.status(200).json(cart);
        }
        res.status(400).json({ message: "Create cart failed" });
    } catch (error) {
        console.log(error);
    }
}
exports.getByIdUser = async (req, res) => {
    try {
        const id_user = req.params.id_user;
        const cart = await Cart.find({ id_user: id_user }, { _id: 1, id_product: 1, quantity: 1 });
        if (cart.length>0) {
            return res.status(200).json(cart);
        }
        res.status(400).json({ message: `Cart with id_user=${id_user} not found` });
    } catch (error) {
        console.log(error);
    }
}
exports.updateCart = async (req, res) => {
    try {
        const id_user = req.body.id_user;
        const id_product = req.body.id_product;
        const cart = await Cart.findOneAndUpdate({ id_user: id_user, id_product: id_product }, { $set: { quantity: req.body.quantity } }, { new: true });
        if (cart) {
            return res.status(200).json(cart);
        }
        res.status(400).json({ message: `Update cart failed` });
    } catch (error) {
        console.log(error);
    }
}
exports.deleteAllCartWithIdUser = async (req, res) => {
    try {
        const id_user = req.params.id_user;
        const result = await Cart.deleteMany({ id_user: id_user });
        if (result.deletedCount > 0)
            return res.status(200).json({ message: 'Cart deleted successfully' })
        res.status(400).json({
            message: `Delete cart with id_user= ${id_user} failed`
        })
    } catch (error) {
        console.log(error);
    }
}
exports.deleteOneCart = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Cart.deleteOne({ _id: id });
        if (result.deletedCount > 0)
            return res.status(200).json({ message: 'Cart deleted successfully' })
        res.status(400).json({
            message: `Delete cart with id= ${id} failed`
        })
    } catch (error) {
        console.log(error);
    }
}