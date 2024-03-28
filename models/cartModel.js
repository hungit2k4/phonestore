const mongoose = require('mongoose');

const Cart = new mongoose.Schema({
    quantity:Number,
    id_product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
    id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
}, {
    timestamps: true,
    collection: 'cart'
});
module.exports = mongoose.model('cart',Cart);