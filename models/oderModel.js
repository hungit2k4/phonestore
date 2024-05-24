const mongoose = require('mongoose');

const Oder = new mongoose.Schema({
    code_oder: String,
    oder_date: {type:Date,default:Date.now()},
    status:{type:Number,default:1},//0:hủy,1:đang giao, 2:đã giao
    total_amount:Number,
    address:String,
    phone_number:String,
    id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
}, {
    timestamps: true,
    collection: 'oder'
});
module.exports = mongoose.model('oder',Oder);