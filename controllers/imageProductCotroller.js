const ImageProduct = require('../models/imageProduct');
const path = require('path');
const fs = require('fs');

exports.createImageProduct = async (req, res) => {
    try {
        uploadImages(req, res);
    } catch (error) {
        console.log(error);
    }

}
exports.getImageProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const image = await ImageProduct.findOne({ _id: id }, { _id: 0, src: 1 });
        if (!image) {
            return res.status(404).json(
                {
                    message: `image product with id ${id} not found`
                }
            )
        }
        const imagePath = path.join(__dirname, '../public/' + image.src);
        res.sendFile(imagePath);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}
exports.getIdImageProduct = async (req, res) => {
    try {
        const id_product = req.params.id_product;
        const image = await ImageProduct.find({ id_product: id_product }, { _id: 1 });
        if (image.length > 0) {
            return res.status(200).json(image);
        }
        res.status(400).json({
            message: `image with id_product= ${id_product} not found`
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}
exports.updateImageProduct = async (req, res) => {
    try {
        const id_product = req.body.id_product;
       await deleteImages(res, id_product,);
        await ImageProduct.deleteMany({ id_product: id_product });
        await uploadImages(req, res);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}
exports.deleteImages = async (req, res) => {
    try {
        const id_product = req.params.id_product;
        deleteImages(res, id_product);
        const result = await ImageProduct.deleteMany({ id_product: id_product });
        if (result.deletedCount > 0) {
            res.status(200).json({
                message: 'Images deleted successfully'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
}


var uploadImages = async (req, res) => {
    var imageProduct = [];
    const { files } = req;
    const urls = files.map((file) => `uploads/${file.filename}`)
    const promises = urls.map(async (item) => {
        var newImage = new ImageProduct({
            src: item,
            id_product: req.body.id_product
        });
        imageProduct.push(await newImage.save());
    });
    await Promise.all(promises);
    res.status(200).json(imageProduct);
}
var deleteImages = async (res, id_product) => {
    const src = await ImageProduct.find({ id_product: id_product }, { src: 1 });
    if (src.length ==0) {
        return res.status(400).json({
            error: 'id product not found'
        });
    }
    src.map((item) => {
        const filePath = path.join(__dirname, '../public/' + item.src);
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
            })
        });
    })
}