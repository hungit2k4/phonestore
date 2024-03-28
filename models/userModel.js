const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: {type:String,unique:true},
    password: String,
    name: String,
    phoneNumber: {type:Number,unique:true},
    address: String,
    email:{type:String,unique:true},
    role:{type:Number,default:1},
    active: {type:Boolean,default:true}

},{
    timestamps: true,
    collection: 'user'
});
module.exports = mongoose.model('user',User);