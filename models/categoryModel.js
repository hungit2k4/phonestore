const mongoose = require('mongoose');
const Category=new  mongoose.Schema({
    nameCategory:String
},{
    timestamps:true,
    collection:'category'    
});
module.exports =mongoose.model('category',Category);