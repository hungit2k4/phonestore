
const ImageUser = require('../models/imageUser');
const path = require('path');
const fs = require('fs');

exports.uploadImage = async (req, res) => {
    try {
        const { file } = req;
        const image = req.body;
        const newImageUser = new ImageUser({
            src: `uploads/${file.filename}`,
            id_user: image.id_user
        })
        const result = await newImageUser.save();
        if (result) {
            res.json({
                body: {
                    "status": 200,
                    "messenger": "thêm thành công",
                    "data": result
                }
            })
        } else {
            res.json({
                body: {
                    "status": 400,
                    "messenger": "lỗi,thêm ko thành công",
                    "data": []
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
}
exports.getImageUser = async (req, res) => {
    try {
        const id_user = req.params.id_user;
        const image = await ImageUser.findOne({ id_user: id_user });
        const imagePath = path.join(__dirname, '../public/' + image.src);
        await res.sendFile(imagePath);
        
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}
exports.delete = async (req, res) => {
    try {
        const id = await req.params.id;
        const src = await ImageUser.findOne({ id_user: id });
        if (!src) {
            return res.status(404).json({
                message: 'Delete image failed'
            });
        }
        const filePath = path.join(__dirname, '../public/' + src.src);
        const images = await ImageUser.deleteMany({ id_user: id });
        fs.access(filePath, fs.constants.F_Ok, (err) => {
            if (err) {
                res.status(400).json(err);
                return;
            }
            fs.unlink(filePath, (err) => {
                if (err) {
                    res.status(400).json(err);
                    return;
                }
                if (images.deletedCount != 0) {
                    res.status(200).json(
                        {message: 'Images deleted successfully'}
                    );
                } else {
                    res.status(400).json(
                        {message: 'Images deleted failed'}
                    );
                }
            })
        });
    } catch (error) {
        console.log(error)
    }
}
exports.updateImageUser = async (req, res) => {
    try {
        const { file } = req;
        const id  = req.body.id;
        const src = await ImageUser.findOne({ _id: id });
        if (!src) {
            return res.status(400).json({
                message: 'id not found'
            })
        }
        const filePath = path.join(__dirname, '../public/' + src.src);
        const updatedImage = await ImageUser.findOneAndUpdate({ _id: id }, { $set: { src: `uploads/${file.filename}` } }, { new: true });
        fs.access(filePath, fs.constants.F_Ok, (err) => {
            if (err) {
                res.status(400).json(err);
                return;
            }
            fs.unlink(filePath, (err) => {
                if (err) {
                    res.status(400).json(err);
                    return;
                }
                if (updatedImage) {
                    res.status(200).json(updatedImage);
                }
            })
        });

    } catch (error) {
        console.log(error)
    }
}
