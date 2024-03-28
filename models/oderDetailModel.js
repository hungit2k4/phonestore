const mongoose = require('mongoose');

const OderDetail = new mongoose.Schema({
    id_product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
    quantity: Number,
    id_oder: { type: mongoose.Schema.Types.ObjectId, ref: 'oder' }
}, {
    timestamps: true,
    collection: 'oderDetail'
});
module.exports = mongoose.model('oderDetail', OderDetail);