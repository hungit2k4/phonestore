const OderDetail= require('../models/oderDetailModel');

exports.createOderDetail =async (req, res) => {
    try {
        const oderDetail = await OderDetail.create(req.body);
        if (oderDetail){
            return res.status(200).json(oderDetail);
        }
        res.status(404).json({
            message: 'Error creating'
        })
    } catch (error) {
        console.log(error);
    }
   
}
exports.getOderDetailByIdOder = async (req, res) => {
    try {
        const id_oder = req.params.id_oder;
        const oderDetail= await OderDetail.find({id_oder:id_oder});
        if (oderDetail.length > 0){
            return res.status(200).json(oderDetail);
        }
        res.status(404).json({
            message: `oder detail with id_oder=${id_oder} not found`
        })
    } catch (error) {
        console.log(error);
    }
}

