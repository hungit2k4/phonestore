const mongoose = require('mongoose');

const Product= new mongoose.Schema({
    name:String,
    quantity:Number,
    price:Number,
    status:Number,
    description:String,
    id_category:{type:mongoose.Schema.Types.ObjectId,ref:'category'}
},{
    timestamps:true,
    collection:'product'
});
module.exports = mongoose.model('product',Product);