const Oder = require('../models/oderModel');

exports.create = async (req, res) => {
    try {
        const oder = await Oder.create(req.body);
        if (oder) return res.status(200).json(oder);
        res.status(400).json({
            message: "create oder failed"
        }

        )
    } catch (error) {
        console.log(error);
    }
}
exports.getOderbyId = async (req, res) => {
    try {
        const id = req.params.id;
        const oder = await Oder.findById(id);
        if (oder) return res.status(200).json(oder);
        res.status(400).json({
            message: `Oder with id = ${id} not found`
        })
    } catch (error) {
        console.log(error);
    }
}
exports.getAllOder = async (req, res) => {
    try {
        const oder = await Oder.find({});
        if (oder) return res.status(200).json(oder);
        res.status(400).json({
            message: `Oder not found`
        })
    } catch (error) {
        console.log(error);
    }
}
exports.getOderbyIdUser = async (req, res) => {
    try {
        const id_user = req.params.id_user;
        const oder = await Oder.find({ id_user: id_user });
        if (oder.length > 0) return res.status(200).json(oder);
        res.status(400).json({
            message: `Oder with id_user = ${id_user} not found`
        })
    } catch (error) {
        console.log(error);
    }
}
exports.newOder = async (req, res) => {
    
        try {
            // Lấy 50 đơn hàng gần nhất, sắp xếp theo thời gian tạo mới nhất
            const latestOrders = await Oder.find().sort({ createdAt: -1 }).limit(20);
            res.status(200).json(latestOrders);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy đơn hàng gần nhất.' });
        }
   
};
exports.updateOder = async (req, res) => {
    try {
        const id = req.body.id;
        const oder = await Oder.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        if (oder) return res.status(200).json(oder);
        res.status(400).json({
            message: `Update oder failed`
        })
    } catch (error) {
        console.log(error);
    }
}
