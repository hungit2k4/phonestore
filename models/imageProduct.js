const mongoose = require('mongoose');

const ImageProduct = new mongoose.Schema({
    src: String,
    id_product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' }
}, {
    timestamps: true,
    collection: 'imageProduct'
});
module.exports = mongoose.model('imageProduct',ImageProduct);