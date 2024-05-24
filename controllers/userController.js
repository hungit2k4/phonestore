const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const mailer = require('../config/mailer');

exports.createUser = async (req, res) => {
    try {
        const result = await User.findOne({
            $or: [
                { email: req.body.email },
                { phoneNumber: req.body.phoneNumber },
                { username: req.body.username }]
        })
        if (result) {
            return res.json({
                status: 400,
                message: "Email, phone number and username already exist",
            });
        }
        const salt = bcrypt.genSaltSync(10);
        var password = bcrypt.hashSync(req.body.password, salt);
        var data = req.body;
        data.password = password;
        const mailOptions = {
            from: '"Phone store 👻" <vg.thanhson@gmail.com>', // Thay thế bằng email của bạn
            to: req.body.email, // Thay thế bằng email người nhận
            subject: 'Email xác nhận đăng ký tài khoản',
            text: `Cảm ơn ${req.body.name}  đã đăng ký tài khoản mã xác thực của bạn là 30000`, // Thay thế bằng nội dung email của bạn
        };
        mailer.sendMail(mailOptions)
            .catch((err) => {
                console.log(err);
            });
        const user = await User.create(req.body);
        res.json({
            status: 200,
            message: "User created successfully",
            data: {
                user: user
            }
        });

    } catch (error) {
        res.json({
            status: 401,
            message: error.message
        });
    }
}

exports.updateUser = async (req, res) => {
    try {
        if (req.body.password) {
            const salt = bcrypt.genSaltSync(10);
            req.body.password = bcrypt.hashSync(req.body.password, salt);
        }
        
        const updatedUser = await User.findOneAndUpdate({ _id: req.body.id }, { $set: req.body }, { new: true });
        if (updatedUser){
            res.json({
                status: 200,
                message: "user updated successfully",
                data: {
                    user: updatedUser
                }
            });
        }else{
            res.json({
                status: 400,
                message: "user update failed",
               
            });
        }
       
    } catch (error) {
        res.json({
            status: 401,
            message: error.message
        });
    }
}


exports.getListUser = async (req, res) => {
    try {
        const user = await User.find({});
        res.json({
            status: 200,
            message: "get user list successfully",
            data: {
                user: user
            }
        });
    } catch (error) {
        res.json({
            status: 401,
            message: error.message
        });
    }
}
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            return res.json({
                status: 200,
                data: user
            });
        }
        res.json({
            status: 400
        });
    } catch (error) {
        res.json({
            status: 401,
            message: error.message
        });
    }
}
exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.deleteOne({ _id: id });
        if (user.deletedCount != 0) {
            res.json({
                status: 200,
                message: "User deleted successfully"
            });
        } else {
            res.json({
                status: 201,
                message: "User not found"
            });
        }

    } catch (error) {
        res.json({
            status: 401,
            message: error.message
        });
    }
}
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.email },
                { phoneNumber: req.body.phoneNumber }
            ]
        })
        console.log(user._id);
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                
                return res.status(200).json(user);
            }
            return res.status(400).json({ message: "Username,email, phone number or password not match" });
        }
        res.status(400).json({ message: "Username,email, phone number or password not match" });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}