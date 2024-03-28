const Product= require('../models/productModel');

exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        if (product){
           return res.status(200).json(product);
        }
        res.status(400).json({message:"Create product failed"});
    } catch (error) {
        console.log(error);
    }
   
}
exports.getAllProduct = async (req, res) => {
    try {
        const products = await Product.find();
        if (products){
           return res.status(200).json(products);
        }
        res.status(400).json([]);
    } catch (error) {
        console.log(error);
    }
   
}
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product){
           return res.status(200).json(product);
        }
        res.status(400).json({message:`Product with id = ${req.params.id} not found`});
    } catch (error) {
        console.log(error);
    }
   
}
exports.getProductByIdCategory = async (req, res) => {
    try {
        const products = await Product.find({id_category: req.params.id_category});
        
        if (products.length > 0) {
           return res.status(200).json(products);
        }
        res.status(400).json({message:`Product with id_category = ${req.params.id_category} not found`});
    } catch (error) {
        console.log(error);
    }
   
}
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.body.id,req.body,{new:true});
        if (product){
           return res.status(200).json(product);
        }
        res.status(400).json({message:`Update product failed`});
    } catch (error) {
        console.log(error);
    }
   
}
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (product){
           return res.status(200).json({
            message:"Product deleted successfully"
           });
        }
        res.status(400).json({message:`Delete product failed`});
    } catch (error) {
        console.log(error);
    }
   
}