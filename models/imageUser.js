const mongoose = require('mongoose');

const ImageUser = new mongoose.Schema({
    src: String,
    id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
}, {
    timestamps: true,
    collection: 'imageUser'
});
module.exports = mongoose.model('imageUser',ImageUser);